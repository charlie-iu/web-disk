import { Image } from 'antd';

function MyImage(props) {
    const { width, height, src, preview } = props
    return (
        <>
            <Image width={width} height={height} src={src} preview={preview}/>
        </>
    )
}

MyImage.defaultProps = {
    width: 25,
    height: 25,
    src: '',
    preview: false,
};

export default MyImage