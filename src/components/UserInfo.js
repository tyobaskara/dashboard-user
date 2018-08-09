import React from 'react';

const UserInfo = (props) => (
  <div>
    "address": 
        "street": {props.data.address.street},
        "suite": {props.data.address.suite},
        "city": {props.data.address.city},
        "zipcode": {props.data.address.zipcode}
    "phone": {props.data.phone},
    "website": {props.data.website},
    "company": 
        "name": {props.data.company.name},
        "catchPhrase": {props.data.company.catchPhrase},
        "bs": {props.data.company.bs},
  </div>
)

export default UserInfo;