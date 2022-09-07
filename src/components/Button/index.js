import './index.css';

export const Button = ({children, ...rest}) => {
    return <button className="button" {...rest}>{children}</button>
}