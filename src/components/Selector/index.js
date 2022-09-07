import './index.css';

export const Selector = ({options, value, onChange}) => {
    return (
        <div className='selector'>
            <select className='selector_select' value={value} onChange={onChange}>
                <option value="">Ничего</option>
                {options.length > 0 && options.map((option, id) => 
                    <option value={option} key={id}>{option}</option>
                )}
            </select>
        </div>
    )
}