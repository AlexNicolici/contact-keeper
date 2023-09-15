import React, { useContext } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/ContactContext";

function Contacts() {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact!</h4>;
  }

  return (
    <div>
      {filtered !== null
        ? filtered.map((contact) => {
            return <ContactItem key={contact.id} contact={contact} />;
          })
        : contacts.map((contact) => {
            return <ContactItem key={contact.id} contact={contact} />;
          })}
    </div>
  );
}

export default Contacts;
