import React from "react";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";


const SearchPage = () => {
  return (
    <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0">
        <input
          className="form-control my-0 py-1"
          type="text"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </MDBCol>
  );
};

export default SearchPage;