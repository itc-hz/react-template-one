import Global from '@/reducer/global/global';

import MeetingTimePicker from '@/reducer/meeting/timepicker';
import MeetingList from '@/reducer/meeting/meetinglist';
import MeetingTemp from '@/reducer/meeting/meetingtemp';
import MeetingEditor from '@/reducer/meeting/meetingeditor';
import MeetingStatistic from '@/reducer/meeting/meetingstatistic';
import MeetingPersonalStatistic from '@/reducer/meeting/meetingPersonalStatistic';
import MeetingEnterpriseStatistic from '@/reducer/meeting/MeetingEnterpriseStatistic';

import MeetingSetup from '@/reducer/meeting/meetingSetup';

import MeetingSeat from '@/reducer/meeting/meetingseat';
import MeetingDetail from '@/reducer/meeting/meetingDetail';
import MeetingRecord from '@/reducer/meeting/meetingRecord';
import MeetingExtend from '@/reducer/meeting/meetingExtend';
import MeetingAttendee from '@/reducer/meeting/meetingAttendee';

import SeatList from '@/reducer/seat/seatlist';
import SeatRoom from '@/reducer/seat/seatRoom';

import VoteList from '@/reducer/vote/votelist';
import VoteEditor from '@/reducer/vote/voteeditor';
import VoteDetail from '@/reducer/vote/voteDetail';
import VoteRecord from '@/reducer/vote/votePecord';

import AccessUserType from '@/reducer/access/userTypeList';
import AccessUserTypeEditor from '@/reducer/access/userTypeEditor';
import AccessUserTypePeoEditor from '@/reducer/access/userTypePeoEditor';
import AccessGroup from '@/reducer/access/groupList';
import AccessGroupEditor from '@/reducer/access/accessGroupEditor';
import AccessManage from '@/reducer/access/accessManage';
import AccessManageEditor from '@/reducer/access/accessManageEditor';
import AccessUserBlack from '@/reducer/access/accessUserBlack';
import AccessUserBlackEditor from '@/reducer/access/accessUserBlackEditor';
import AccessHolidayPass from '@/reducer/access/accessHolidayPass';
import AccessHolidayPassEditor from '@/reducer/access/accessHolidayPassEditor';
import AccessPassRecord from '@/reducer/access/accessPassRecord';
import AccessPassRecordByRoom from '@/reducer/access/accessPassRecordByRoom';
import LogisticsList from '@/reducer/logistics/logisticsList';
import LogisticsEditor from '@/reducer/logistics/logisticsEditor';
import LogisticsDetail from '@/reducer/logistics/logisticsDetail';
import LogisticsClassify from '@/reducer/logistics/logisticsClassify';
import LogisticsGoods from '@/reducer/logistics/logisticsGoods';
import AccessAdmin from '@/reducer/access/accessAdmin';
import AccessAdminEditor from '@/reducer/access/accessAdminEditor';
import AccessVersionEditor from '@/reducer/access/accessVersionEditor';
import AccessVersion from '@/reducer/access/accessVersion';

import ShortMessageStatistic from '@/reducer/shortMessage/shortMessageStatistic';
import VoucherCenter from '@/reducer/shortMessage/voucherCenter';
import VoucherRecord from '@/reducer/shortMessage/voucherRecord';
import GetVoucherInvoice from '@/reducer/shortMessage/getVoucherInvoice';
import VoucherInvoiceList from '@/reducer/shortMessage/voucherInvoiceList';

import ScheduleDate from '@/reducer/schedule/schedule';

import DevicesCard from '@/reducer/devices/devicesCard';
import DevicesControlEditor from '@/reducer/devices/devicesControlEditor';
import DoorScreen from '@/reducer/devices/doorScreen';
import DevicesTypeTable from '@/reducer/devices/devicesTypeTable';
import DevicesTypeEditor from '@/reducer/devices/devicesTypeEditor';
import DevicesRecordTable from '@/reducer/devices/devicesRecordTable';
import DevicesUserTable from '@/reducer/devices/devicesUserTable';
import ScenesEditor from '@/reducer/devices/scenesEditor';
import DevicesUserEditor from '@/reducer/devices/devicesUserEditor';
import DevicesZkEditor from '@/reducer/devices/devicesZkEditor';

import NopaperList from '@/reducer/nopaper/nopaperList';

import DepartmentEditor from '@/reducer/department/departmentEditor';
import EmployeeEditor from '@/reducer/department/employeeEditor';
import DepartmentList from '@/reducer/department/departmentList';
import EmployeeDetail from '@/reducer/department/employeeDetail';
import ImportUserEditor from '@/reducer/department/importUserEditor';
import AdjustmentEditor from '@/reducer/department/adjustmentEditor';

import RolesEditor from '@/reducer/roles/rolesEditor';
import RolesPeoEditor from '@/reducer/roles/rolesPeoEditor';
import TransferEditor from '@/reducer/roles/transfer';
import RolesLogs from '@/reducer/roles/roleLogs';

import MeetingRoom from '@/reducer/meetingRoom/index';

// 导入子reducer，通过combineReducers进行合并处理
import DeviceList from "@/reducer/broadcast/devicelist";
import ZoneManagement from "@/reducer/broadcast/zoneManagement";
import ZoneEditShow from "@/reducer/broadcast/zoneEditShow";
import AudioNameEditShow from "@/reducer/broadcast/audioNameEditShow";
import AudioManagement from "@/reducer/broadcast/audioManagement";
import BroadcastTask from "@/reducer/broadcast/broadcastTask";
import PaperlessMeeting from '@/reducer/paperless/meeting';
import PaperlessServer from '@/reducer/paperless/server';
import PaperlessUser from '@/reducer/paperless/user';

import RecordingDevicesTable from '@/reducer/recording/recordingDevicesTable';
import RecordingDevicesEditor from '@/reducer/recording/recordingDevicesEditor';
import RecordingManagementEditor from '@/reducer/recording/recordingManagementEditor';
import RecordingManagementTable from '@/reducer/recording/recordingManagementTable';
import RecordingVideoTable from '@/reducer/recording/recordingVideoTable';
import RecordingVideoEditor from '@/reducer/recording/recordingVideoEditor';
import RecordingStockTable from '@/reducer/recording/recordingStockTable';
import RecordingStockEditor from '@/reducer/recording/recordingStockEditor';
import RecordingGuideEditor from '@/reducer/recording/recordingGuideEditor';
import RecordingVideoFileTable from '@/reducer/recording/recordingVideoFileTable';
import RecordingMovieEditor from '@/reducer/recording/recordingMovieEditor';
import RecordingSettings from '@/reducer/recording/recordingSettings';

import InputBox from '@/reducer/distributedSetting/inputBox';
import OutputBox from '@/reducer/distributedSetting/outputBox';
import WallManagement from '@/reducer/distributedSetting/wallManagement';
import DistributedCenter from '@/reducer/distributedCenter/distributedCenter';
import RecordSetting from '@/reducer/distributedSetting/recordSetting';
import RecordNormal from '@/reducer/distributedSetting/recordNormal';
import RecordTiming from '@/reducer/distributedSetting/recordTiming';
import RecordManagement from '@/reducer/distributedSetting/recordManagement';
import RecordSystem from '@/reducer/distributedSetting/recordSystem';
import WebSocket from '@/reducer/distributedSetting/webSocket';

import ServicePending from '@/reducer/logisticsService/servicePending';
import AddService from '@/reducer/logisticsService/addService';
import ServiceDetails from '@/reducer/logisticsService/serviceDetails';
import ServiceProcessing from '@/reducer/logisticsService/serviceProcessing';
import ServiceProcessed from '@/reducer/logisticsService/serviceProcessed';
import ServiceRejected from '@/reducer/logisticsService/serviceRejected';
import ServiceCancelled from '@/reducer/logisticsService/serviceCancelled';
import OrderPending from '@/reducer/logisticsService/orderPending';
import OrderDetails from '@/reducer/logisticsService/orderDetails';
import OrderProcessing from '@/reducer/logisticsService/orderProcessing';
import OrderProcessed from '@/reducer/logisticsService/orderProcessed';
import OrderRejected from '@/reducer/logisticsService/orderRejected';
import LogisticsPersonne from '@/reducer/logisticsService/logisticsPersonne';
import GoodsClassification from '@/reducer/logisticsService/goodsClassification';
import GoodsList from '@/reducer/logisticsService/goodsList';

import ProcessSystem from '@/reducer/process/system';
import ProcessExamine from '@/reducer/process/examine';
import ProcessLaunch from '@/reducer/process/launch';
import ProcessApproval from '@/reducer/process/approval';

import VideoMeetinglistTable from '@/reducer/video/meetingListTable';
import VideoMeetingListEditor from '@/reducer/video/meetingListEditor';
import VideoMeetingTemplateTable from '@/reducer/video/meetingTemplateTable';
import VideoMeetingListDetail from '@/reducer/video/meetingListDetail';
import VideoVcsEnterpriselistTable from "@/reducer/video/vcsEnterpriseListTable";
import VideoVcsEnterpriseEditor from "@/reducer/video/vcsEnterpriseListEditor";
import VideoVcsUserListTable from "@/reducer/video/vcsUserListTable";
import VideoVcsUserEditor from "@/reducer/video/vcsUserListEditor";

import Detector from '@/reducer/detector/detector';
import DetectorEditor from '@/reducer/detector/detectorEditor';
import DetectorConfigEditor from '@/reducer/detector/configEditor';
import DetectorLogs from '@/reducer/detector/detectorlogs';
import AttendanceOverview from '@/reducer/attendanceChecking/attendanceOverview';
import AttendanceStatistics from '@/reducer/attendanceChecking/attendanceStatistics';
import MyAttendanceOverview from '@/reducer/attendanceChecking/myAttendanceOverview';
import MyAttendanceStatistics from '@/reducer/attendanceChecking/myAttendanceStatistics';
import AttendanceRules from '@/reducer/attendanceChecking/attendanceRules';
import OvertimeRules from '@/reducer/attendanceChecking/overtimeRules';
import CardReplacement from '@/reducer/attendanceChecking/cardReplacement';
import HolidayRules from '@/reducer/attendanceChecking/holidayRules';
import LeaveBalance from '@/reducer/attendanceChecking/leaveBalance';
import AttendanceRecords from '@/reducer/attendanceChecking/attendanceRecords';

import Visitor from '@/reducer/visitor';

import AssetsIndex from '@/reducer/assets/index';
import AssetsSort from '@/reducer/assets/sort';
import AssetsSpareSupervise from '@/reducer/assets/spareSupervise';
import AssetsConsumables from '@/reducer/assets/consumables';
import AssetsFixedSupervise from '@/reducer/assets/fixedSupervise';
import AssetsFixedAskfro from '@/reducer/assets/fixedAskfro';
import AssetsFixedCheck from "@/reducer/assets/fixedCheck";

import QuestionManagement from '@/reducer/itsmSystem/questionManagement';
import EventManagement from '@/reducer/itsmSystem/eventManagement';
import WorkOrderManagement from '@/reducer/itsmSystem/workOrderManagement';
import ChangeManagement from '@/reducer/itsmSystem/changeManagement';
import KnowledgeManagement from '@/reducer/itsmSystem/KnowledgeManagement';
import ServiceGroupManagement from '@/reducer/itsmSystem/serviceGroupManagement';
import ServiceGroupAuthorization from '@/reducer/itsmSystem/serviceGroupAuthorization';
import ServiceSetting from '@/reducer/itsmSystem/serviceSetting';
import ServiceControl from '@/reducer/itsmSystem/serviceControl';

import {combineReducers} from 'redux';

const reducers = combineReducers({
    Global,
    MeetingTimePicker,
    MeetingList,
    MeetingTemp,
    MeetingStatistic,

    MeetingPersonalStatistic,
    MeetingEnterpriseStatistic,
    MeetingSetup,

    MeetingSeat,
    MeetingEditor,
    MeetingDetail,
    MeetingRecord,
    MeetingExtend,
    MeetingAttendee,
    
    SeatList,
    SeatRoom,

    VoteList,
    VoteEditor,
    VoteDetail,
    VoteRecord,
    
    AccessUserType,
    AccessUserTypeEditor,
    AccessUserTypePeoEditor,
    AccessGroup,
    AccessGroupEditor,
    AccessManage,
    AccessManageEditor,
    AccessUserBlack,
    AccessUserBlackEditor,
    AccessHolidayPass,
    AccessHolidayPassEditor,
    AccessPassRecord,
    AccessPassRecordByRoom,
    AccessAdmin,
    AccessAdminEditor,
    AccessVersion,
    AccessVersionEditor,
    LogisticsList,
    LogisticsEditor,
    LogisticsDetail,
    LogisticsClassify,
    LogisticsGoods,
    ShortMessageStatistic,
    VoucherCenter,
    VoucherRecord,
    GetVoucherInvoice,
    VoucherInvoiceList,
    ScheduleDate,
    DevicesCard,
    DevicesControlEditor,
    DoorScreen,
    DevicesTypeTable,
    DevicesTypeEditor,
    DevicesRecordTable,
    DevicesUserTable,
    ScenesEditor,
    DevicesUserEditor,
    DevicesZkEditor,

    NopaperList,
    DepartmentEditor,
    EmployeeEditor,
    DepartmentList,
    EmployeeDetail,
    ImportUserEditor,
    AdjustmentEditor,

    RolesEditor,
    RolesPeoEditor,
    TransferEditor,
    RolesLogs,
    MeetingRoom,
    DeviceList,
    ZoneManagement,
    ZoneEditShow,
    AudioNameEditShow,
    AudioManagement,
 
    PaperlessMeeting,
    PaperlessServer,
    PaperlessUser,
    RecordingDevicesTable,
    RecordingDevicesEditor,
    RecordingManagementEditor,
    RecordingManagementTable,
    RecordingVideoTable,
    RecordingVideoEditor,
    RecordingStockEditor,
    RecordingStockTable,
    RecordingGuideEditor,
    RecordingVideoFileTable,
    RecordingMovieEditor,
    RecordingSettings,

    VideoMeetinglistTable,
    VideoMeetingListEditor,
    VideoMeetingTemplateTable,
    VideoMeetingListDetail,
    VideoVcsEnterpriselistTable,
    VideoVcsEnterpriseEditor,
    VideoVcsUserListTable,
    VideoVcsUserEditor,

    ProcessSystem,
    ProcessExamine,
    ProcessLaunch,
    ProcessApproval,
    InputBox,
    OutputBox,
    WallManagement,
    DistributedCenter,
    RecordSetting,
    RecordNormal,
    RecordTiming,
    RecordManagement,
    
    Detector,
    DetectorEditor,
    DetectorConfigEditor,
    DetectorLogs,
    BroadcastTask,
    RecordSystem,
    WebSocket,

    Visitor,
    ServicePending,
    AddService,
    ServiceDetails,
    ServiceProcessing,
    ServiceProcessed,
    ServiceRejected,
    ServiceCancelled,
    OrderPending,
    OrderDetails,
    OrderProcessing,
    OrderProcessed,
    OrderRejected,
    LogisticsPersonne,

    AssetsIndex,
    AssetsSort,
    AssetsSpareSupervise,
    AssetsConsumables,
    AssetsFixedSupervise,
    AssetsFixedAskfro,
    AssetsFixedCheck,
    
    GoodsClassification,
    GoodsList,
    AttendanceOverview,
    AttendanceStatistics,
    MyAttendanceOverview,
    MyAttendanceStatistics,
    AttendanceRules,
    OvertimeRules,
    CardReplacement,
    HolidayRules,
    LeaveBalance,

    QuestionManagement,
    EventManagement,
    WorkOrderManagement,
    ChangeManagement,
    KnowledgeManagement,
    ServiceGroupManagement,
    ServiceGroupAuthorization,
    ServiceSetting,
    ServiceControl,
    AttendanceRecords,
});

export default reducers;