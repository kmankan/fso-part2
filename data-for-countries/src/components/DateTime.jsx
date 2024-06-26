const DateTime = ({date, time, timezone}) => {

  return (
    <div>
      <h3>Time</h3>
      <p>date: {date}</p>
      <p>time: {time}</p>
      <p>timezone: {timezone}</p>
    </div>
  )
};

export default DateTime