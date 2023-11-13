import { nanoid } from 'nanoid';
import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handleNumberChange = e => {
    this.setState({ number: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onAddContact, contacts } = this.props;
    if (name.trim() === '' || number.trim() === '') return;

    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase === name.toLowerCase
    );
    if (isExistingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    onAddContact(newContact);
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="nameInput">Name</label>
        <input
          id="nameInput"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={name}
          onChange={this.handleNameChange}
        />
        <label htmlFor="numberInput">Number</label>
        <input
          id="numberInput"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={this.handleNumberChange}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
