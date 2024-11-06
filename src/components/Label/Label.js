import './Label.css'


function Label(){

    return (
        <div className="label-container">
            <ul className="label">
                <li className="label-item" ><input type='checkbox' className='checkbox'/></li>
                <li className="label-item" >Name</li>
                <li className="label-item" >Size</li>
                <li className="label-item" >Mimetype</li>
                <li className="label-item" >Modified</li>
            </ul>
        </div>
    )
}

export default Label