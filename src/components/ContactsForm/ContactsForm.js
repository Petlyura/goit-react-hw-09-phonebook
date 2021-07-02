// import React, { Component } from 'react';
import React, { useState, useCallback } from "react";

// import { connect } from 'react-redux';
import { useDispatch, useSelector } from "react-redux";

import contactsOperations from "../../redux/contacts/contactsOperations";
import styles from "./ContactFrom.module.scss";
import contactsSelectors from "../../redux/contacts/contactsSelectors";
import { store } from "react-notifications-component";

function ContactForm({ openModal }) {
  // state = {
  //   name: "",
  //   number: "",
  // };
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const contacts = useSelector(contactsSelectors.getContacts);

  const dispatch = useDispatch();

  const handleInputChange = useCallback((event) => {
    const { name, value, defaultValue } = event.target;

    if (defaultValue.length > 12) {
      store.addNotification({
        title: "Error!",
        message: "Max lenght is 12 symbols!",
        type: "danger",
        insert: "bottom",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: false,
          showIcon: true,
        },
      });

      // this.setState((prevState) => ({
      //   [name]: prevState[name].substring(
      //     0,
      //     prevState[name].length - 1
      //   ),
      // }));
      return;
    }

    // this.setState({ [name]: value });
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        break;
    }
  }, []);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // const { name, number } = this.state;
      // const { contacts } = this.props;

      const isIncludeContact = contacts.some(
        (contact) => contact.name === name
      );

      if (isIncludeContact) {
        openModal();
        setName("");
        setNumber("");
        return;
      }

      const payload = {
        name,
        number,
      };

      dispatch(contactsOperations.addContact(payload));

      // this.setState({
      //   name: "",
      //   number: "",
      // });

      setName("");
      setNumber("");
    },
    [dispatch, contacts, name, number, openModal]
  );

  // const { name, number } = this.state;
  return (
    <form onSubmit={handleFormSubmit}>
      <label className={styles.label}>
        Name:
        <input
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </label>
      <label className={styles.label}>
        Number:
        <input
          className={styles.input}
          type="tel"
          name="number"
          value={number}
          onChange={handleInputChange}
          required
        />
      </label>
      <button className={styles.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

// const mapStateToProps = (state) => ({
//   contacts: contactsSelectors.getContacts(state),
// });

// const mapDispatchToProps = {
//   onAddContact: contactsOperations.addContact,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
export default ContactForm;
