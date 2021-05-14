import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import * as rtl from 'react-testing-library';
// import 'jest-dom/extend-expect'; ---> from tutorial, broken?
import ContactForm from './ContactForm';
import App from '../App';

test('renders without errors', async ()=>{ //can also be called it?
    render(
        <ContactForm/> //Arrange, Act, Assert
    );
    render(
        <ContactForm isFetchingData={false}/>
    );
}); 

test('renders the contact form header', async () => {
    //Arrange
    render(
        <ContactForm/> //Arrange, Act, Assert
    );
    //Act
        const header = screen.getByText(/Contact/i); // the / is regex syntax
        //or const header = screen.getByQuesy(/Contact Form/i);

    //Assert
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
    expect(header).toHaveTextContent('Contact Form');

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(
        <ContactForm/>
    );
    const firstName5 = screen.getByLabelText(/First Name/i) //why getByLabel (not that it works, used to, what would and why)

    userEvent.type(firstName5, 'Joey');
    const errMsg = await screen.getByTestId('error');

    // expect(firstName5).toHaveTextContent('First Name');
    // expect(firstName5).toHaveTextContent('First Name');
    expect(errMsg).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(
        <ContactForm/>
    );
    //get where, do there, get what, expect what (get, do, what, expect - g d gw e)

    // const subNone = screen.queryByRole('input', /submit/i); //g BROKEN, how get "<input type="submit" />?"
    const button = screen.getByRole('button', /submit/i); //old vers.
    userEvent.click('button'); //d
    const err = await screen.findAllByTestId('error'); //gw
    expect(err).toHaveLength(3); // e BREAKS: toBeGreaterThanOrEqual(3) 

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(
        <ContactForm/>
    );
    //get
    const firstNameInp = screen.queryByLabelText(/First Name/i)
    const lastNameInp = screen.queryByLabelText('Last Name') //can do '' instead of //i, but shouldn't
    const subNone2 = screen.queryByRole('input', /submit/i); //g BROKEN, how get "<input type="submit" />?"
    //do
    userEvent.type(firstNameInp, 'Johnny');
    userEvent.type(lastNameInp, /Cashing/i);
    userEvent.click(subNone2);
    //get what
    const err = screen.getByTestId('error') //ctrl + f in ContactForm.js "error" --> data-testid="error"
    expect(error);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(
        <ContactForm/>
    );
    const mailCorr = screen.getByLabelText(/Email*/i); //same issue tho might work now (double check) how to get these elements properly?
    userEvent.type(mailCorr, 'johnny.johnny@gmailDOTcom');
    const errorrInvalidMail = screen.getByTestId('error')
    expect(errorrInvalidMail)
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(
    <ContactForm/>
    );
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, "joey5");
    const emailyemail = screen.getByLabelText(/email/i);
    userEvent.type(emailyemail, "samplemailmail@google.com");
    const buttonClick2 = screen.getByRole('button', /submit/i);
    userEvent.click(buttonClick2);
    const error = await screen.findByTestId('error');
    expect(error).toHaveTextContent("lastName is a required field");
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(
    <ContactForm/>
    );
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', /submit/i);
    userEvent.type(firstName,'joey5');
    userEvent.type(lastName,'bertschler');
    userEvent.type(email, 'joey@john.johnny');
    userEvent.click(button);
    const firstNameDisplay = screen.getByTestId(/firstnamedisplay/i);
    const lastNameDisplay = screen.getByTestId(/lastnamedisplay/i);
    const emailDisplay = screen.getByTestId(/emaildisplay/i);
    const messageDisplay = screen.queryByTestId(/messagedisplay/i);
    expect(firstNameDisplay);
    expect(lastNameDisplay);
    expect(emailDisplay);
    expect(messageDisplay).not.toBeInTheDocument();
    //no display 4 button
});

test('renders all fields text when all fields are submitted.', async () => {
    //basically just simulating what when everything is properly submitted
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const message = screen.getByLabelText(/message/i);
    const email = screen.getByLabelText(/email/i);
    const button = screen.getByRole('button', /submit/i);
    userEvent.type(firstName,'joey5');
    userEvent.type(lastName,'bertschler');
    userEvent.type(email, 'joey@john.johnny');
    userEvent.type(message, 'Hello World');
    userEvent.click(button);
    const firstNameDisplay = screen.getByTestId(/firstnamedisplay/i);
    const lastNameDisplay = screen.getByTestId(/lastnamedisplay/i);
    const emailDisplay = screen.getByTestId(/emaildisplay/i);
    const messageDisplay = screen.getByTestId(/messagedisplay/i);
    expect(firstNameDisplay);
    expect(lastNameDisplay);
    expect(emailDisplay);
    expect(messageDisplay);
    //no display 4 button
});

/* Some stuff is broken. Aiming to ask during the next support hours:  <-----------------------

-ContactForm.test.js 9
-ContactForm.test.js 38 + ContactForm.js 76
-ContactForm.test.js 54-55, 69 (+why 67 work cross check/ask for workflow)
-ContactForm.test.js 83 (might work now)
-ContactForm.test.js 97 where button (if none, why and how else do, also why work if no button?
 how to handle "<input type="submit" />"