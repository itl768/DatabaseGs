import React, { useState, Key, useRef } from 'react'

import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Divider, Modal, Space, Form } from 'antd'
import type { ConfirmModelLoadingTypes } from '../../data'
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText, DrawerForm, ProFormTextArea, ProFormCheckbox, ProFormDatePicker, ProFormSelect } from '@ant-design/pro-form';
// change this accordingly

import { queryData, addData, updateData, removeData } from '../../services/workflowServices'

import { useIntl, FormattedMessage } from 'umi';
import form from 'antd/lib/form';


// change as the page

type TableListItem = {
    id: number;
    nameV: string;
houseNo: string;
gender: string;
relationship: string;
maritalStatus: string;
nic:string;
educationLevel:string;
jobDescription:string;
workplaceAddress:string;
birthday: string;
houseStyle: string;
publicFunds: string;
revenueNumber: string;
samurdhi: boolean;
homePhone: number;
phone: number



  
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



    const showModal = () => {
        setConfirmLoading({ ...confirmLoading, add: true })
        handleAddModalVisible(true)
    }


    const handleAdd = async (felids: TableListItem) => {
        const hide = message.loading(warningMsgs.addLoading)
        try {

            await addData(pageType, { ...felids })
            tableRef.current?.reload()
            handleAddModalVisible(false)
            hide();
            form.resetFields();
            message.success(warningMsgs.addSuccess)
            return true
        } catch (error) {
            console.log(error)
            hide()
            message.error(warningMsgs.addFailed)
            return false
        }
    }

    const handleEdit = async (updateParams: TableListItem) => {
        const hide = message.loading(warningMsgs.updateLoading)
        try {
            await updateData(pageType, { ...updateParams })
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
            await removeData(deleteID)
            tableRef.current?.reload()
            message.success(warningMsgs.deleteSuccess)
            return false
        } catch (error) {
            console.log(error)
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


    // form fields
    const formFields = () => {
        return (<>
        <Space>
            <ProFormText
                label={'Name'}
                name="nameV"
                placeholder={""}
                width="sm"
                rules={[
                    {
                        required: true,
                        message: (
                            <FormattedMessage
                                id="pages.workflow.action.name.rule"
                                defaultMessage="Action Name is a mandatory field"
                            />
                        ),
                    },
                ]}

            />
            <ProFormText
                label={'House No'}
                name="houseNo"
                placeholder={""}
                width="sm"


            />
           
             <ProFormSelect
              width="sm"
              options={[
                {
                  value: '0',
                  label: 'Male',
                },{
                value: '1',
                label: 'Female',
              },
              ]}
              name="gender"
              label="Gender"
            />
            </Space>
            <Space>
             <ProFormText
                label={'Relationship'}
                name="relationship"
                placeholder={"relationship"}
                width="sm"


            />
             <ProFormSelect
              width="sm"
              options={[
                {
                  value: '0',
                  label: 'Married',
                },{
                value: '1',
                label: 'Unmarried',
              },
              ]}
              name="maritalStatus"
              label="Marital status"
            />
            
             <ProFormDatePicker 
              width="sm" 
              name="birthday" 
              label="Birthday" />
            </Space>
            <Space>
             <ProFormText
                label={'NIC'}
                name="nic"
                placeholder={"NIC no"}
                width="sm"

            />
             <ProFormText
                label={'Education level'}
                name="educationLevel"
                placeholder={"education level"}
                width="sm"


            />
             <ProFormText
                label={'Job description'}
                name="jobDescription"
                placeholder={"job description"}
                width="sm"


            />
            </Space>
            <Space>
             <ProFormText
                label={'Workplace Address'}
                name="workplaceAddress"
                placeholder={"gender"}
                width="sm"


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
            title: "Gender",
            dataIndex: 'gender',
            valueType: 'text',
            hideInTable:true
        },
        {
            title: "Relationship",
            dataIndex: 'relationship',
            valueType: 'text',
            hideInTable:true
        },
        {
            title: "Maritalstatus",
            dataIndex: 'maritalStatus',
            valueType: 'select',
            valueEnum: {
                0: { text: 'Unmarried' },
                1: { text: 'Married' },
               
              },
            hideInTable:true
        },
        {
            title: "NIC",
            dataIndex: 'nic',
            valueType: 'text',
            hideInTable:true
        },
        {
            title: "Education level",
            dataIndex: 'educationLevel',
            valueType: 'text',
            hideInTable:true
        },
        {
            title: "Job description",
            dataIndex: 'jobDescription',
            valueType: 'text',
            hideInTable:true
        },
        // {
        //     title: "House Style",
        //     dataIndex: 'housestyle',
        //     valueType: 'select',
        //     valueEnum: {
        //         0: { text: 'Permenant/temperorygovernment' },
        //         1: { text: 'Married' },
               
        //       },
        // },
        // {
        //     title: "Public funds",
        //     dataIndex: 'publicfunds',
        //     valueType: 'text',
        //     hideInTable:true
        // },
        // {
        //     title: "Revenew number",
        //     dataIndex: 'revenueNumber',
        //     valueType: 'text',
        //     hideInTable:true
        // },
        // {
        //     title: "Samurdhi",
        //     dataIndex: 'samurdhi',
        //     valueType: 'text',
        //     hideInTable:true
        // },
        // {
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
            width: 120,
            valueType: 'option',
            render:
                (entity, dom) => [
                    <DrawerForm
                        key='1'
                        labelWidth="auto"
                        trigger={
                            <div>
                                <a type="primary">
                                    Edit
                                </a>
                                <Divider type="vertical" />
                            </div>
                        }
                        onFinish={async (values: TableListItem) => {
                            handleEdit({ ...values, 
                                id: dom.id,
                                nameV:values.nameV,
                                houseNo:values.houseNo,
                                gender:values.gender,
                                relationship:values.relationship,
                                maritalStatus:values.maritalStatus,
                                nic:values.nic,
                                educationLevel:values.educationLevel,
                                jobDescription:values.jobDescription,
                                workplaceAddress:values.workplaceAddress ,
                                birthday:values.birthday,
                                // houseStyle: values.houseStyle,
                                // publicFunds: values.publicFunds,
                                // revenueNumber: values.publicFunds,
                                // samurdhi: values.samurdhi,
                                // homePhone: values.homePhone,
                                // phone: values.phone
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
                        request={async () => {
                            return {
                                id: dom.id,
                                nameV:dom.nameV,
                                houseNo:dom.houseNo,
                                gender:dom.gender,
                                relationship:dom.relationship,
                                maritalStatus:dom.maritalStatus,
                                nic:dom.nic,
                                educationLevel:dom.educationLevel,
                                jobDescription:dom.jobDescription,
                                workplaceAddress:dom.workplaceAddress,   
                                birthday:dom.birthday,
                                // houseStyle: dom.houseStyle,
                                // publicFunds: dom.publicFunds,
                                // revenueNumber: dom.publicFunds,
                                // samurdhi: dom.samurdhi,
                                // homePhone: dom.homePhone,
                                // phone: dom.phone,
                     
                                useMode: 'chapter',
                            }
                        }}
                    >

                        {formFields()}


                    </DrawerForm>,
                    <a key="2" onClick={() => {
                       // setDeleteId(dom.id)
                        showDeleteModal(dom.id)
                    }}><FormattedMessage id="pages.workflow.delete" defaultMessage="Delete" /></a>
                ]
        },

    ];



    return (
        <>

            <ProTable<TableListItem>

                columns={columns}
                request={(params, sorter, filter) => queryData( { params })}
                actionRef={tableRef}
                rowKey="id"
                columnsStateMap={columnsStateMap}
                onColumnsStateChange={(map) => setColumnsStateMap(map)}
                search={true}
                pagination={{
                    showSizeChanger: true,
                }}
                dateFormatter="string"
                headerTitle={intl.formatMessage({
                    id: 'pages.workflow.action.title',
                    defaultMessage: "Dependants",
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

                width={800}
                title={intl.formatMessage({
                    id: 'pages.workflow.action.addnew',
                    defaultMessage: 'Add New Person',
                })}
                onFinish={async (values: any) => {
                    await handleAdd(values as TableListItem)
                }}
                visible={addModalVisible}
                onVisibleChange={handleAddModalVisible}
                initialValues={{
                    useMode: 'chapter',
                }}
            >


                {formFields()}
            </ModalForm>

        </>
    )
}

export default Actions