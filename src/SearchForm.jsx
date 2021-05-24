import Strings from "./Strings";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import { useState } from "react";
import "./Styles.css";

const SearchForm = (props) => {
  let [districtsData,districtDataChanged] = useState([]);
  let [districts,districtchanged] = useState([]);
  let [stateData,stateDataChanged] = useState([]);
  let [states,statechanged] = useState([]);
  let [selectedDistrict,selectedDistrictchanged] = useState('');

  const onStateChange = (e) => {
    let id = stateData.filter((state)=>{
      if(state.state_name === e.value){
        return state;
      }
    })[0].state_id;
    axios
      .get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`)
      .then((response) => {
        districtDataChanged(response.data.districts);
        districtchanged(
          response.data.districts.map((district) => {
            return district.district_name;
          })
        );
      })
  };

  const onDistrictChange = (e) => {
    let id = districtsData.filter((district) => {
      if (district.district_name === e.value) {
        return district;
      }
    })[0].district_id;
    selectedDistrictchanged(id);
  };

  const onSearch = (e) => {
    e.preventDefault();
    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth()+1;
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    currentDate = `${dd}-${mm}-${currentDate.getFullYear()}`;
    if (selectedDistrict !== "") {
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${selectedDistrict}&date=${currentDate}`
        )
        .then((response) => {
          props.onResult(response.data.centers)
        });
    } else {
      console.log("validation error");
    }
  };

  const onFocuses = () => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => {
        stateDataChanged(response.data.states);
        statechanged(
          response.data.states.map((state) => {
            return state.state_name;
          })
        );
      })
  };

  return (
    <div>
      <form id="districtselector" onSubmit={onSearch}>
        <div className="mar_small">
      <Dropdown
        options={states}
        onChange={onStateChange}
        onFocus={onFocuses}
        placeholder="Select State"
      />
      </div>
      <div className="mar_small">
      <Dropdown
         options={districts}
        onChange={onDistrictChange}
        placeholder="Select District"
      />
      </div>
      <button type="submit" className="mar_small">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
