import React, { Fragment, useContext, useEffect } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/ContactContext";
import Spinner from "../layout/Spinner";

function Contacts() {
  const contactContext = useContext(ContactContext);

  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4>Please add a contact!</h4>;
  }

  return (
    <div>
      {contacts !== null && !loading ? (
        <div>
          {filtered !== null
            ? filtered.map((contact) => {
                return <ContactItem key={contact._id} contact={contact} />;
              })
            : contacts.map((contact) => {
                return <ContactItem key={contact._id} contact={contact} />;
              })}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Contacts;
