interface filterProps {
    key: string;
    id: string;
    selected: boolean;
    on: boolean;
    handleClick: () => void;
    handleClickWhenSelected: () => void;
    image: string;
}

export default function FilterButton(props: filterProps) {
    const styles = {
        backgroundColor: props.on ? "lightBlue" : "#D9D9D9"
    }
    return (
        <button 
        onClick={props.selected ? props.handleClickWhenSelected : props.handleClick} 
        style={styles}>
            <img 
            src={props.image} 
            alt={`Select ${props.id}`} 
            />
            <p>{props.id}</p>
        </button>
    )
}