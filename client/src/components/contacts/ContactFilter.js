import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../../context/contact/ContactContext";

function ContactFilter() {
  const contactContext = useContext(ContactContext);
  const text = useRef("");

  const { filterContacts, clearFilter, filtered } = contactContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    e.preventDefault();

    if (text.current.value !== "") {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        onChange={onChange}
        ref={text}
        type="text"
        placeholder="Filter Contacts..."
      />
    </form>
  );
}

export default ContactFilter;
