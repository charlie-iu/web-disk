import { useContext } from 'react';
import { Form, Input } from 'antd';

export default function MyReName(props) {
    const { value, myContext } = props;
    const dispatch = useContext(myContext);

    const handleChange = e => {
        const { name, value } = e.target;
        dispatch({
            type: 'UPDATE_FORM_VALUE',
            payload: { name, value }
        });
    };
    return (
        <>
            <Form layout='vertical'>
                <Form.Item
                    label='名称'
                >
                    <Input
                        size='small'
                        placeholder='输入文件夹名称'
                        name='newFolderName'
                        value={value}
                        onChange={(e) => handleChange(e)}
                    />
                </Form.Item>
            </Form>
        </>
    )
}
