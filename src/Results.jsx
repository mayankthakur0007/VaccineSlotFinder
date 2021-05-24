import { forwardRef } from "react";
import "./Styles.css";

const Results = (props) => {
  let currentDate = new Date();
  let newDate, compareDates;
  let week = [];
  for (var i = 0; i <= 6; i++) {
    newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i
    );
    let dd = currentDate.getDate() + i;
    let mm = currentDate.getMonth() + 1;
    if(dd<10){
      dd= '0'+dd;
    }
    if(mm<10){
      mm= '0'+mm;
    }
    compareDates = `${dd}-${mm}-${currentDate.getFullYear()}`
    week.push({date:newDate.toDateString(),id:i,compareDate:compareDates});
  }

  let CenterData = props.data.map((details)=>{

    let datesData = week.map((dates)=>{
      return details.sessions.filter((list)=>{
        return list.date===dates.compareDate
      })
    })

    datesData = datesData.map((dates)=> dates[0])
      
    return {
      center_id: details.center_id,
      center_name: details.name,
      center_block: details.block_name,
      center_state: details.state_name,
      center_pincode: details.pincode,
      center_district: details.district_name,
      center_address: details.address,
      center_fee: details.fee_type,
      slots: datesData
    }
  });

  console.log(CenterData);

  return (
    <div>
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Center Name</th>
            {week.map((day) => (
              <th key={day.id}>{day.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CenterData.map((centerinfo) => (
            <tr key={centerinfo.center_id}>
              <td>
                {centerinfo.center_name}
                <span>
                  {centerinfo.center_address},{centerinfo.center_district},
                  {centerinfo.center_state}({centerinfo.center_pincode})
                </span>
              </td>
              {centerinfo.slots.map((slot) => {
                return slot ?
                  <td key={slot.session_id}>
                    <h3>{slot.available_capacity}</h3>
                  </td> : <td><h4>NA</h4></td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;