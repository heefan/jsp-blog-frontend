import loadable from "@loadable/component";

//https://stackoverflow.com/questions/62218381/antd-icon-type-from-string-in-v4
const DynamicIcon = loadable(props =>
    import(`@ant-design/icons/es/icons/${props.type}.js`)
        .catch(err => import(`@ant-design/icons/es/icons/WarningOutlined.js`)))

export default DynamicIcon;
