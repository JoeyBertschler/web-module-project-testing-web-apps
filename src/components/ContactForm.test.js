import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
    render(<ContactForm isFetchingData={false}/>)
});

test('renders the contact form header', ()=> {
        
        render(<ContactForm />);
        const header = screen.getByText(/Contact Form/i);
        // console.log(simulatedDOM.debug());
        // const h1 = simulatedDOM.getByText(/Lambda/i);
        // const simulatedDOM = render(<ContactForm/>);
        // const h1 = simulatedDOM.queryByText(/ContactForm/i);
        // const h1 = simulatedDOM.queryByText(/ContactForm/i);
        expect(header).toBeInTheDocument();
        expect(header).toBeTruthy();
        expect(header).toHaveTextContent('Contact Form');
        // expect(header).toHaveTextContent('First Name*');

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/First Name/i);
    userEvent.type(firstNameInput, 'Joey');
    const errorMessage = await screen.getByTestId("error");
    expect(errorMessage).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const submitNothing = screen.getByRole("button", /submit/i);
    userEvent.click(submitNothing);
    const error = await screen.findAllByTestId('error');
    // expect(error).toBeGreaterThanOrEqual(3);
    expect(error).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const firstNameInput = screen.getByLabelText(/first name/i);
    const lastNameInput = screen.getByLabelText(/last name/i);
    const buttonClick = screen.getByRole("button", /submit/i);
    userEvent.type(firstNameInput, "joey5");
    userEvent.type(lastNameInput, "bertschler");
    userEvent.click(buttonClick);
    const error = await screen.findByTestId('error');
    expect(error);
    // expect(error).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const invalidEmail = screen.getByLabelText(/email/i);
    userEvent.type(invalidEmail, "invalidemail@missingthedotDOTcom");
    const error = await screen.findByTestId('error');
    expect(error);
});

// test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
//     render(<ContactForm/>);
//     const requiredLastName = screen.getByLabelText(/last name/i);
//     userEvent.type(requiredLastName, "");
//     const buttonClick2 = screen.getByRole('button', /submit/i);
//     userEvent.click(buttonClick2);
//     const error = await screen.findAllByTestId('error');
//     expect(error).toHaveTextContent("lastName is a required field");
// });


test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
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
    render(<ContactForm/>);
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
    render(<ContactForm/>);
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