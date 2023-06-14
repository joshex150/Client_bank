import React from "react";
import format from "date-fns/format";

import "./style.scss";

type Props = {
  profile: {
    firstname: String;
    lastname: String;
    email: String;
    password: String;
    country: String;
    state: String;
    zip: Number;
    city: String;
    phone: String;
    amount: Number;
    createdAt: Date;
  };
};

const ProfileHeader: React.FC<Props> = (props) => {
  const { firstname,
   lastname,
   email,
   password,
   country,
   state,
   zip,
   city,
   phone,
   amount } =
    props.profile;
  const formatDate = (date: Date, dateFormat: string) =>
    format(new Date(date), dateFormat);
  let createdAt = formatDate(props.profile.createdAt, "dd/MM/yyyy HH:mm");

  return (
    <header className="profile-header">
      <div className="profile-user-info">
        <h3>
          {firstname} {lastname}
        </h3>
        <p>
          {country}, {city}
        </p>
        <p>
          <strong>Email: </strong> {email}
        </p>
        <p>
          <strong>Registered on</strong> {createdAt}
        </p>
      </div>

      <img
        src="https://placehold.it/200x200"
        alt={`${firstname} ${lastname} profile`}
      />
    </header>
  );
};

export default ProfileHeader;
