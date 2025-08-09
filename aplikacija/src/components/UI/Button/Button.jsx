import classes from "./Button.module.css"

const Button = (props) => {
    return <button type="submit" onClick={props.onClick}>{props.children}</button>
}

export default Button;