export default function RichText(props) {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.content }}></div>
    )
}