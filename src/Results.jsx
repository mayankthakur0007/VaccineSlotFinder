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
          {CenterData.map((centerinfo,index) => (
            <tr key={centerinfo.center_id}>
              <td className="centers">
                {centerinfo.center_name}<br />
                <span>
                  {centerinfo.center_address},{centerinfo.center_district},
                  {centerinfo.center_state}({centerinfo.center_pincode})
                </span>
              </td>
              {centerinfo.slots.map((slot) => {
                return slot ? (
                  <td key={slot.session_id}>
                    <div className="flexbox">
                      <div
                        className={
                          slot.available_capacity > 0
                            ? "capacity_available"
                            : "booked"
                        }
                      >
                        <p>
                          {slot.available_capacity > 0
                            ? slot.available_capacity
                            : "Booked"}
                        </p>
                      </div>
                      <div className="doses">
                        <div className="dose1">
                          dose1: {slot.available_capacity_dose1}
                        </div>
                        <div className="dose2">
                          dose2: {slot.available_capacity_dose2}
                        </div>
                      </div>
                      <div>
                        <p className={centerinfo.center_fee==="Free"? "free": "paid"}>
                          {centerinfo.center_fee}
                        </p>
                      </div>
                      <div>
                        <p className="paid">Age Limit: {slot.min_age_limit}+</p>
                      </div>
                      <div>
                      <p>{slot.vaccine}</p>
                      </div>
                    </div>
                  </td>
                ) : (
                  <td>
                    <h4 key={index}>NA</h4>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;