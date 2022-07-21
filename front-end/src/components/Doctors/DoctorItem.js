import classes from './DoctorItem.module.css';

const DoctorItem = props => {
  const { imageUrl, name, speciality, experience } = props;

  return (
    <>
      <div className={classes['image-container']}>
        <img src={imageUrl} alt={`Dr. ${name}`} />
      </div>

      <section className={classes['card-body']}>
        <h3>Dr. {name}</h3>

        <h4>Speciality:</h4>
        <div>{speciality}</div>

        <h4>Doctor experience:</h4>
        <p>{experience}</p>

        <button>Book Appointment</button>
      </section>
    </>
  );
};

export default DoctorItem;

// <Card
//   img="https://images.unsplash.com/photo-1569235080412-01b4eefa5fbe?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
//   title="White Blouse"
//   description="Blouse • Lacey"
//   price="19.95"
// />

//   function Card(props) {
//     return (
//       <div className="card">
//         <img src={props.img} className="card__img" />
//         <div className="card__body">
//           <h2 className="card__title">{props.title}</h2>
//           <p className="card__description">{props.description}</p>
//           <h3 className="card__price">{props.price}</h3>
//           <button className="card__btn">Add to Cart</button>
//         </div>
//       </div>
//     );
//   }
