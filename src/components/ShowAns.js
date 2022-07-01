import React from 'react'
import { Link } from 'react-router-dom'

const ShowAns = (props) => {
    return (
        <>
            <div className="showAns">
                <div className="card d-flex cardSet" id='main-result'>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkesgxm5TDSMZvEeFv8wMNGgx6KRCxc8jbg&usqp=CAU" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Taxable Income</h5>
                        <p className="card-text" id='ans-txt'>{props.value} Rupees</p>
                        <Link to="/about" className="btn btn-primary glow-on-hover" id='btn-abt'>About</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowAns