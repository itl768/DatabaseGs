import React, { useState, useEffect, Key, useRef } from 'react'

import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Divider, Modal, Space, Form } from 'antd'
import type { ConfirmModelLoadingTypes } from '../../data'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, DrawerForm, ProFormTextArea, ProFormCheckbox, ProFormDatePicker, ProFormSelect, ProFormDigit } from '@ant-design/pro-form';
// change this accordingly
import { Typography } from 'antd';

import { queryData, addData, updateData, removeData } from '../../services/workflowServices'

import { useIntl, FormattedMessage } from 'umi';
import form from 'antd/lib/form';
import { PageContainer } from '@ant-design/pro-layout';
import moment from 'moment';
const { Title, Paragraph, Text, Link } = Typography;
const { get } = require('lodash');

// change as the page

type TableListItem = {
    id: number;
    abroadName1: string;
    abroadName2: string;
    acres: string;
    address: string;
    agoffice1: string;
    agoffice2: string;
    birthday: string;
    disabilityDonations: string;
    disabilityName: string;
    disabilityStatus: string;
    disabilityType: string;
    donationAmount: string;
    donationPostOffice: string;
    donations: string;
    educationLevel: string;
    gender: string;
    homePhone: string;
    houseNo: string;
    houseType: string;
    isHeadPerson: string;
    jobDescription: string;
    jobType: string;
    maritalStatus: string;
    nameV: string;
    nic: string;
    phone: string;
    reason: string;
    relationship: string;
    residanceDate: string;
    residanceStatus: string;
    retireName1: string;
    retireName2: string;
    retireNo1: string;
    retireNo2: string;
    samurdhi: string;
    workplaceAddress: string;
    nameIni: string;
    isDeseased: string;
    isShifted: string;
    shiftedAddr: string;
    donationType: string;
    revenueNo: string;





};

const warningMsgs = {
    addLoading: 'Adding',
    addFailed: 'Adding person failed, please try again!',
    addSuccess: 'Adding successfully',
    updateLoading: "Edting",
    updateFailed: "Editing person failed, please try again",
    updateSuccess: "Person edited sucessfully",
    deleteLoading: "Deleting",
    deleteFailed: "Deleting Action Failed, please try again",
    deleteSuccess: "Action deleted sucessfully",

};

// change the page type
const pageType = "Actions";
interface TableType {
    reload: (resetPageIndex?: boolean) => void;
    reloadAndRest: () => void;
    reset: () => void;
    clearSelected?: () => void;
    startEditable: (rowKey: Key) => boolean;
    cancelEditable: (rowKey: Key) => boolean;
}


const Actions: React.FC = () => {
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
        name: {
            show: false,
        },
        order: 2,
    });

    const [confirmLoading, setConfirmLoading] = useState<ConfirmModelLoadingTypes>({ add: false, edit: false })

    const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);
    // const [deleteById, setDeleteId] = useState<number>(0)

    const tableRef = useRef<TableType>()
    const intl = useIntl();
    const { confirm } = Modal;
    const [form] = Form.useForm();
    const [headPersonVal, setHeadPersonVal] = useState(true)
    const [isReciveDonations, setisReciveDonations] = useState(true)
    const [isAnyDis, setIsAnyDis] = useState(true)
    const [isShift, setIsShift] = useState(true)

    const convertNumtoString = (object) => {
        const objectt = object
        for (var key in object) {
            if (typeof (object[key]) === "number") {
                object[key] = object[key].toString()
            }

        }
        console.log(objectt)
        return object
    }

    const showModal = () => {
        setConfirmLoading({ ...confirmLoading, add: true })
        handleAddModalVisible(true)
    }
    // useEffect(() => {
    //     setHeadPersonVal(false);
    // }, [])

    const handleAdd = async (felids: TableListItem) => {
        const hide = message.loading(warningMsgs.addLoading)
        try {

            const res = await addData(pageType, { ...felids })
            if (!res) {
                throw new Error("dd")
            }
            tableRef.current?.reload()
            handleAddModalVisible(false)
            hide();
            form.resetFields();
            message.success(warningMsgs.addSuccess)
            return true
        } catch (error) {
            //console.log(error)
            hide()
            message.error(warningMsgs.addFailed)
            return false
        }
    }

    const handleEdit = async (updateParams: TableListItem) => {
        const hide = message.loading(warningMsgs.updateLoading)
        try {
            const res = await updateData(pageType, { ...updateParams })
            if (!res) {
                throw new Error("dd")
            }
            tableRef.current?.reload()
            message.success(warningMsgs.updateSuccess)
            return false
        } catch (error) {
            console.error(error)
            hide()
            message.error(warningMsgs.updateFailed)
            return false
        }
    }

    const handleDelete = async (deleteID: number) => {
        const hide = message.loading(warningMsgs.deleteLoading)
        try {
            const res = await removeData(deleteID)
            if (!res) {
                throw new Error("dd")
            }
            tableRef.current?.reload()
            message.success(warningMsgs.deleteSuccess)
            return false
        } catch (error) {
            //console.log(error)
            hide()
            message.error(warningMsgs.deleteFailed)
            return false
        }
    }


    function showDeleteModal(deleteID: number) {
        confirm({
            title: 'Do you want to delete this ?',
            icon: <ExclamationCircleOutlined />,
            content: 'The selected Item will be deleted',
            onOk() { handleDelete(deleteID) },
            onCancel() { },
        });
    }

    const formOnchange = (e) => {

        //console.log(get(e, "isHeadPerson", false))


        if (get(e, "isHeadPerson", "noVal") !== "noVal") {
            setHeadPersonVal(e['isHeadPerson'] == 0 ? false : true)
            //console.log(e['isHeadPerson'])
        }
        if (get(e, "donations", "noVal") !== "noVal") {
            setisReciveDonations(e['donations'] == 0 ? false : true)

        }

        if (get(e, "disabilityStatus", "noVal") !== "noVal") {
            setIsAnyDis(e['disabilityStatus'] == 0 ? false : true)

        }
        if (get(e, "isShifted", "noVal") !== "noVal") {
            setIsShift(e['isShifted'] == 0 ? false : true)

        }


    }
    // form fields
    const formFields = (isDisabled) => {
        return (<>
            <Space>
                <ProFormText
                    disabled={isDisabled}
                    label={'Name'}
                    name="nameV"
                    placeholder={""}
                    width="sm"
                    rules={[
                        {
                            required: true,
                            message: "Name is a mandatory field"
                            ,
                        },
                    ]}

                />
                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Yes',
                        }, {
                            value: '1',
                            label: 'No',
                        },
                    ]}
                    name="isHeadPerson"
                    label="Is head person"
                />
                <ProFormText
                    disabled={isDisabled}
                    label={'House No'}
                    name="houseNo"
                    placeholder={""}
                    width="sm"
                    rules={[
                        {
                            required: true,
                            message: "This is a mandatory field"
                            ,
                        },
                    ]}


                />
                <ProFormText
                    disabled={isDisabled}
                    label={'Name with initials'}
                    name="nameIni"
                    placeholder={""}
                    width="sm"


                />
            </Space>
            <Space>
                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Male',
                        }, {
                            value: '1',
                            label: 'Female',
                        },
                    ]}
                    name="gender"
                    label="Gender"
                />

                <ProFormText
                    disabled={isDisabled}
                    label={'Relationship'}
                    name="relationship"
                    placeholder={"relationship"}
                    width="sm"


                />

                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Married',
                        }, {
                            value: '1',
                            label: 'Unmarried',
                        },
                    ]}
                    name="maritalStatus"
                    label="Marital status"
                />

                <ProFormDatePicker
                    disabled={isDisabled}
                    width="sm"
                    name="birthday"
                    label="Birthday" />

            </Space>
            <Space>

                <ProFormText
                    disabled={isDisabled}
                    label={'NIC'}
                    name="nic"
                    placeholder={"NIC no"}
                    width="sm"
                    rules={[
                        {
                            required: true,
                            message: "This is a mandatory field"
                            ,
                        },
                    ]}
                />
                <ProFormText
                    disabled={isDisabled}
                    label={'Education level'}
                    name="educationLevel"
                    placeholder={"education level"}
                    width="sm"


                />

                <ProFormDigit
                    disabled={isDisabled}
                    label={'House phone'}
                    name="homePhone"
                    placeholder={"Phone number"}
                    width="sm"


                />

                <ProFormDigit
                    disabled={isDisabled}
                    label={'Phone number'}
                    name="phone"
                    placeholder={"Phone no"}
                    width="sm"


                />
            </Space>
            <Space>
                <ProFormText
                    disabled={isDisabled}
                    label={'Address'}
                    name="address"
                    width="lg"


                />
                <ProFormText
                    disabled={isDisabled}
                    label={'Revenue No'}
                    name="revenueNo"
                    placeholder={""}
                    width="sm"
                    hidden={headPersonVal}

                />
            </Space>
            <Divider > <Text> Job Details</Text></Divider>

            <Space>


                <ProFormText
                    disabled={isDisabled}
                    label={'Job description'}
                    name="jobDescription"
                    placeholder={"job description"}
                    width="sm"


                />
                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Government',
                        }, {
                            value: '1',
                            label: 'Private',
                        },
                        {
                            value: '2',
                            label: 'Other',
                        },
                    ]}
                    name="jobType"
                    label="Job type"
                />

                <ProFormText
                    disabled={isDisabled}
                    label={'Workplace Address'}
                    name="workplaceAddress"
                    width="sm"


                />
            </Space>


            <Divider >  <Text> House Style</Text></Divider>
            <Space>

                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Permenant',
                        }, {
                            value: '1',
                            label: 'Partially permenant',
                        },
                        {
                            value: '2',
                            label: 'Temporary',
                        },
                        {
                            value: '3',
                            label: 'Hut',
                        },
                    ]}
                    name="houseType"
                    label="House type"
                />
            </Space>

            <Divider >    <Text> Donations</Text></Divider>
            <Space>
                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Yes',
                        }, {
                            value: '1',
                            label: 'No',
                        },
                    ]}
                    name="donations"
                    label="Do you receive donations"
                />
                <ProFormText
                    disabled={isDisabled}
                    label={'Donation type'}
                    name="donationType"
                    placeholder={"Type"}
                    width="sm"
                    hidden={isReciveDonations}


                />
                <ProFormDigit
                    disabled={isDisabled}
                    label={'Amount'}
                    name="donationAmount"
                    placeholder={"Amount"}
                    width="sm"
                    hidden={isReciveDonations}


                />
                <ProFormText
                    disabled={isDisabled}
                    label={'Post office'}
                    name="donationPostOffice"
                    placeholder={"Post Office"}
                    width="sm"
                    hidden={isReciveDonations}


                />

            </Space>
            <Space>
                <ProFormText
                    disabled={isDisabled}
                    label={'Reason'}
                    name="reason"
                    placeholder={"Reason"}
                    width="sm"
                    hidden={isReciveDonations}


                />

            </Space>

            {headPersonVal ? "" : <Divider><Text> Disabilities</Text></Divider>}
            <Space>
                <ProFormSelect
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Yes',
                        }, {
                            value: '1',
                            label: 'No',
                        },
                    ]}
                    name="disabilityStatus"
                    label="Any one disabled in the family"
                />
                <ProFormText
                    hidden={headPersonVal || isAnyDis}
                    disabled={isDisabled}
                    label={'If yes Name '}
                    name="disabilityName"
                    placeholder={"Reason"}
                    width="sm"


                />
                <ProFormText
                    hidden={headPersonVal || isAnyDis}
                    disabled={isDisabled}
                    label={'Type of disability '}
                    name="disabilityType"
                    placeholder={"Type"}
                    width="sm"


                />
                <ProFormText
                    hidden={headPersonVal || isAnyDis}
                    disabled={isDisabled}
                    label={'If you reseave donations, howmuch?'}
                    name="disabilityDonations"
                    placeholder={"Donations"}
                    width="sm"


                />
            </Space>

            {headPersonVal ? "" : <Divider>   <Text> Land size</Text></Divider>}
            <Space>            <ProFormText
                disabled={isDisabled}
                label={'Acres, Rood, Perch'}
                name="acres"
                placeholder={"landSize"}
                width="sm"
                hidden={headPersonVal}
            />
                <ProFormSelect
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Permenant',
                        }, {
                            value: '1',
                            label: 'Temperory',
                        },
                    ]}
                    name="residanceStatus"
                    label="ResidanceStatus"
                />
                <ProFormDatePicker
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    width="sm"
                    label="Date of initial residency"
                    name="residanceDate" />
            </Space>

            {headPersonVal ? "" : <Divider>  <Text> Goverment retired persons</Text></Divider>}
            <Space>

                {headPersonVal ? "" : <Text>Person1 : </Text>}

                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Names '}
                    name="retireName1"
                    placeholder={"Name1"}
                    width="sm"
                />
                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Retirement No '}
                    name="retireNo1"
                    placeholder={""}
                    width="sm"
                />
                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Divisional Secr Office '}
                    name="agoffice1"
                    placeholder={""}
                    width="sm"
                />
            </Space>
            <Space>

                {headPersonVal ? "" : <Text>Person2 : </Text>}
                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Names '}
                    name="retireName2"
                    placeholder={"Name"}
                    width="sm"
                />
                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Retirement No '}
                    name="retireNo2"
                    placeholder={""}
                    width="sm"
                />
                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Divisional Secr Office '}
                    name="agoffice2"
                    placeholder={""}
                    width="sm"
                />
            </Space>

            {headPersonVal ? "" : <Divider> <Text> Any family members abroad</Text></Divider>}
            <Space>

                {headPersonVal ? "" : <Text>Person1 : </Text>}

                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Names '}
                    name="abroadName1"
                    placeholder={"Name1"}
                    width="sm"
                />

                {headPersonVal ? "" : <Text>Person2 : </Text>}
                <ProFormText
                    hidden={headPersonVal}
                    disabled={isDisabled}
                    label={'Names '}
                    name="abroadName2"
                    placeholder={"Name"}
                    width="sm"
                />
            </Space>

            <Divider> <Text> Do you recieve samurdhi</Text></Divider>
            <Space>
                <ProFormSelect
                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Yes',
                        }, {
                            value: '1',
                            label: 'No',
                        },
                    ]}
                    name="samurdhi"
                    label="Samurdhi"
                />
            </Space>
            {headPersonVal ? "" : <Divider> <Text>Status</Text></Divider>}
            <Space>
                <ProFormSelect
                    disabled={isDisabled}
                    hidden={headPersonVal}

                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Yes',
                        }, {
                            value: '1',
                            label: 'No',
                        },
                    ]}
                    name="isDeseased"
                    label="Is deseased"
                />

                <ProFormSelect
                    hidden={headPersonVal}

                    disabled={isDisabled}
                    width="sm"
                    options={[
                        {
                            value: '0',
                            label: 'Yes',
                        }, {
                            value: '1',
                            label: 'No',
                        },
                    ]}
                    name="isShifted"
                    label="Moved to a new place"
                />

                <ProFormText
                    hidden={headPersonVal || isShift}
                    disabled={isDisabled}
                    label={'New Address '}
                    name="shiftedAddr"
                    placeholder={"address"}
                    width="lg"
                />
            </Space>
        </>)
    }



    // table columns

    const columns: ProColumns<TableListItem>[] = [

        {
            title: "Name",
            dataIndex: 'nameV',
            valueType: 'text',
        },
        {
            title: "HouseNo",
            dataIndex: 'houseNo',
            valueType: 'text',
        },
        {
            title: "NIC",
            dataIndex: 'nic',
            valueType: 'text',
        },
        {
            title: "Relationship",
            dataIndex: 'relationship',
            valueType: 'text',
            hideInTable: true
        },
        {
            title: "Maritalstatus",
            dataIndex: 'maritalStatus',
            valueType: 'select',
            valueEnum: {
                0: { text: 'Unmarried' },
                1: { text: 'Married' },

            },
            hideInTable: true
        },

        {
            title: "Education level",
            dataIndex: 'educationLevel',
            valueType: 'text',
            hideInTable: true
        },
        {
            title: "Job description",
            dataIndex: 'jobDescription',
            valueType: 'text',
            hideInTable: true
        },
        {
            title: "Gender",
            dataIndex: 'gender',
            valueType: 'text',
            hideInTable: true
        },
        //     title: "home Phone",
        //     dataIndex: 'homePhone',
        //     valueType: 'text',
        //     hideInTable:true
        // },
        // {
        //     title: "Phone",
        //     dataIndex: 'homePhone',
        //     valueType: 'text',
        //     hideInTable:true
        // },



        {
            title: <FormattedMessage id="pages.workflow.action.titleOption" defaultMessage="Options" />,
            width: 160,
            valueType: 'option',
            render:
                (entity, dom) => [
                    <DrawerForm
                        width={1000}
                        labelwidth="auto"
                        trigger={
                            <div>
                                <a onClick={() => {
                                    formOnchange(dom)
                                }} type="primary">
                                    View
                                </a>

                            </div>
                        }

                        submitter={{
                            // Configure the button text
                            searchConfig: {
                                resetText: 'Close',
                                submitText: 'Generate Report',

                            },
                            // Configure the properties of the button

                        }}

                        initialValues={convertNumtoString(dom)}
                        onFinish={async (values: TableListItem) => {
                            console.log(values)
                        }}
                    >

                        {formFields(true)}


                    </DrawerForm >,
                    <DrawerForm
                        onValuesChange={formOnchange}

                        width={1000}
                        labelwidth="auto"
                        trigger={
                            <div>
                                <a type="primary" onClick={() => {
                                    formOnchange(dom)
                                }}>
                                    Edit
                                </a>
                                <Divider type="vertical" />
                            </div>
                        }
                        onFinish={async (values: TableListItem) => {


                            handleEdit({
                                ...values,
                                id: dom.id,
                                abroadName1: values.abroadName1,
                                abroadName2: values.abroadName2,
                                acres: values.acres,
                                address: values.address,
                                agoffice1: values.agoffice1,
                                agoffice2: values.agoffice2,
                                birthday: moment(values.birthday).format("YYYY-MM-DD"),
                                disabilityDonations: values.disabilityDonations,
                                disabilityName: values.disabilityName,
                                disabilityStatus: values.disabilityStatus,
                                disabilityType: values.disabilityType,
                                donationAmount: values.donationAmount,
                                donationPostOffice: values.donationPostOffice,
                                donations: values.donations,
                                educationLevel: values.educationLevel,
                                gender: values.gender,
                                homePhone: values.homePhone,
                                houseNo: values.houseNo,
                                houseType: values.houseType,
                                isHeadPerson: values.isHeadPerson,
                                jobDescription: values.jobDescription,
                                jobType: values.jobType,
                                maritalStatus: values.maritalStatus,
                                nameV: values.nameV,
                                nic: values.nic,
                                phone: values.phone,
                                reason: values.reason,
                                relationship: values.relationship,
                                residanceDate: moment(values.residanceDate).format("YYYY-MM-DD"),
                                residanceStatus: values.residanceStatus,
                                retireName1: values.retireName1,
                                retireName2: values.retireName2,
                                retireNo1: values.retireNo1,
                                retireNo2: values.retireNo2,
                                samurdhi: values.samurdhi,
                                workplaceAddress: values.workplaceAddress,
                                nameIni: values.nameIni,
                                isDeseased: values.isDeseased,
                                isShifted: values.isShifted,
                                shiftedAddr: values.shiftedAddr,
                                donationType: values.donationType,
                                revenueNo: values.revenueNo


                            })
                        }}

                        submitter={{
                            // Configure the button text
                            searchConfig: {
                                resetText: 'Close',
                                submitText: 'Edit',
                            },
                            // Configure the properties of the button

                        }}
                        initialValues={convertNumtoString(dom)}

                    >

                        {formFields(false)}


                    </DrawerForm >,
                    <a key="2" onClick={() => {
                        // setDeleteId(dom.id)
                        showDeleteModal(dom.id)
                    }}><FormattedMessage id="pages.workflow.delete" defaultMessage="Delete" /></a>
                ]
        },

    ];


    return (
        <>
            <PageContainer style={{ background: "white", height: "100%" }}>

                <ProTable<TableListItem>
                    columns={columns}
                    request={(params, sorter, filter) => queryData({ params })}
                    actionRef={tableRef}
                    rowKey="id"
                    columnsStateMap={columnsStateMap}
                    onColumnsStateChange={(map) => setColumnsStateMap(map)}
                    search={true}
                    filterType={"light"}
                    pagination={{
                        showSizeChanger: true,
                    }}
                    dateFormatter="string"
                    headerTitle={intl.formatMessage({
                        id: 'pages.workflow.action.title',
                        defaultMessage: "Head Person list",
                    })}
                    toolBarRender={() => [
                        <Button key="button" onClick={showModal} icon={<PlusOutlined />} type="primary" >
                            <FormattedMessage id="pages.departments.new" defaultMessage=" New" />
                        </Button>,
                    ]}
                />




                {/* Add Action Model */}

                <ModalForm
                    form={form}
                    onValuesChange={formOnchange}

                    width={1000}
                    title={intl.formatMessage({
                        id: 'pages.workflow.action.addnew',
                        defaultMessage: 'Add New Person',
                    })}
                    onFinish={async (values: any) => {
                        const res = await handleAdd(values as TableListItem)
                        //console.log("trerer", res)
                        if (res) {
                            handleAddModalVisible(false);

                        }
                    }}
                    visible={addModalVisible}
                    onVisibleChange={handleAddModalVisible}
                    initialValues={{
                        disabilityStatus: '1',
                        donations: '1',
                        isHeadPerson: '1',
                        maritalStatus: '1',
                        samurdhi: '1',
                        useMode: 'chapter',
                    }}
                >


                    {formFields(false)}
                </ModalForm>
            </PageContainer>
        </>
    )
}

export default Actions