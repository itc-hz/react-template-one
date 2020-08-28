import {createStore, Store} from 'redux';
import reducers from '@/reducer';

import {GlobalState} from '@/store/global/global';

import {MeetingListState} from '@/store/meeting/meetinglist';
import {MeetingTempState} from '@/store/meeting/meetingTemp';
import {MeetingTimePickerState} from '@/store/meeting/meetingTimePicker';
import {MeetingEditorState} from '@/store/meeting/meetingEditor';
import {MeetingStatisticState} from '@/store/meeting/meetingStatistic';

import {MeetingPersonalStatisticState} from '@/store/meeting/meetingPersonalStatistic';
import {MeetingEnterpriseStatisticState} from '@/store/meeting/meetingEnterpriseStatistic';
import {MeetingSetupState} from '@/store/meeting/meetingsetup';

import {MeetingSeatState} from '@/store/meeting/meetingSeat';
import {MeetingDetailState} from '@/store/meeting/meetingDetail';
import {MeetingRecordState} from "@/store/meeting/meetingRecord";
import {MeetingExtendState} from '@/store/meeting/meetingExtend';
import {MeetingAttendeeState} from '@/store/meeting/meetingAttendeeStatus';

import {SeatListState} from '@/store/seat/seatList';
import {SeatRoomState} from '@/store/seat/seatRoom';

import {VoteListState} from '@/store/vote/voteList';
import {VoteEditorState} from '@/store/vote/voteEditor';
import {VoteDetailState} from '@/store/vote/voteDetail';
import {VoteRecordState} from '@/store/vote/votePecord';

import {AccessUserTypState} from '@/store/access/userType';
import {UserTypeEditorState} from '@/store/access/userTypeEditor';
import {UserTypePeoEditorState} from '@/store/access/userTypePeoEditor';
import {AccessGroupState} from "@/store/access/groupList";
import {AccessGroupEditorState} from '@/store/access/groupEditor';
import {AccessManageState} from '@/store/access/accessManage';
import {AccessManageEditorState} from '@/store/access/accessManageEditor';
import {AccessUserBlackState} from '@/store/access/accessUserBlack';
import {AccessUserBlackEditorState} from '@/store/access/accessUserBlackEditor';

import {AccessHolidayPassState} from '@/store/access/accessHolidayPass';
import {AccessHolidayPassEditorState} from '@/store/access/accessHolidayPassEditor';
import {AccessPassRecordState} from '@/store/access/accessPassRecord';
import {AccessPassRecordByRoomState} from "@/store/access/accessPassRecordByRoom";
import {AccessAdminState} from '@/store/access/accessAdmin';
import {AccessAdminEditorState} from '@/store/access/accessAdminEditor';
import {AccessVersionState} from '@/store/access/accessVersion';
import {AccessVersionEditorState} from '@/store/access/accessVersionEditor';

import {LogisticsListState} from '@/store/logistics/logisticsList';
import {LogisticsEditorState} from '@/store/logistics/logisticsEditor';
import {LogisticsDetailState} from '@/store/logistics/logisticsDetail';
import {LogisticsClassifyState} from '@/store/logistics/logisticsClassify';
import {LogisticsGoodsState} from '@/store/logistics/logisticsGoods';

import {ShortMessageStatisticState} from '@/store/shortMessage/shortMessageStatistic';
import {VoucherCenterState} from '@/store/shortMessage/voucherCenter';
import {VoucherRecordState} from '@/store/shortMessage/voucherRecord';
import {GetVoucherInvoiceState} from '@/store/shortMessage/getVoucherInvoice';
import {VoucherInvoiceListState} from '@/store/shortMessage/voucherInvoiceList';

import {ScheduleDateState} from "@/store/schedule/scheduleDate";

import {DevicesCardState} from '@/store/devices/devicesCard';
import {DevicesControlEditorState} from '@/store/devices/devicesControlEditor';
import {DoorScreenState} from '@/store/devices/doorScreen';
import {DevicesTypeTableState} from '@/store/devices/devicesTypeTable';
import {DevicesTypeEditorState} from '@/store/devices/devicesTypeEditor';
import {DevicesRecordTableState} from '@/store/devices/devicesRecordTable';
import {DevicesUserTableState} from '@/store/devices/devicesUserTable';
import {ScenesEditorState} from '@/store/devices/scenesEditor';
import {DevicesUserEditorState} from '@/store/devices/devicesUserEditor';
import {DevicesZkEditorState} from '@/store/devices/devicesZkEditor';

import {NopaperListState} from '@/store/nopaper/nopaperList';

import {DepartmentEditorState} from '@/store/department/departmentEditor';
import {EmployeeEditorState} from '@/store/department/employeeEditor';
import {DepartmentListState} from '@/store/department/departmentList';
import {EmployeeDetailState} from '@/store/department/employeeDetail';
import {ImportUserEditorState} from '@/store/department/importUserEditor';
import {AdjustmentEditorState} from '@/store/department/adjustmentEditor';

import {RolesEditorState} from '@/store/roles/rolesEditor';
import {RolesPeoEditorState} from '@/store/roles/rolesPeoEditor';
import {TransferState} from '@/store/roles/transfer';
import {RolesLogsState} from '@/store/roles/roleLogs';

import {RecordingDevicesTableState} from '@/store/recording/recordingDevicesTable';
import {RecordingDevicesEditorState} from '@/store/recording/recordingDevicesEditor';
import {RecordingManagementTableState} from '@/store/recording/recordingManagementTable';
import {RecordingManagementEditorState} from '@/store/recording/recordingManagementEditor';
import {RecordingVideoTableState} from '@/store/recording/recordingVideoTable';
import {RecordingVideoEditorState} from '@/store/recording/recordingVideoEditor';
import {RecordingStockTableState} from '@/store/recording/recordingStockTable';
import {RecordingStockEditorState} from '@/store/recording/recordingStockEditor';
import {RecordingGuideEditorState} from '@/store/recording/recordingGuideEditor';
import {RecordingVideoFileTableState} from '@/store/recording/recordingVideoFileTable';
import {RecordingMovieEditorState} from '@/store/recording/recordingMovieEditor';
import {RecordingSettingsState} from '@/store/recording/recordingSettings';

import {MeetingRoomState} from '@/store/meetingRoom/index';

// 将我们定义的数据类型进行导入
import {DeviceListState} from "@/store/broadcast/devicelist";
import {ZoneManagementState} from "@/store/broadcast/zoneManagement";
import {ZoneEditShowState} from "@/store/broadcast/zoneEditShow";
import {AudioNameEditShowState} from "@/store/broadcast/editAudioNameShow";
import {AudioManagementState} from "@/store/broadcast/audioManagement";
import {BroadcastTaskState} from "@/store/broadcast/broadcastTask";
import {InputBoxState} from "@/store/distributedSetting/inputBox";
import {OutputBoxState} from "@/store/distributedSetting/outputBox";
import {WallManagementState} from "@/store/distributedSetting/wallManagement";
import {DistributedCenterState} from "@/store/distributedCenter/distributedCenter";
import {RecordSetState} from "@/store/distributedSetting/recordSetting";
import {RecordNormalState} from "@/store/distributedSetting/recordNormal";
import {RecordTimingState} from "@/store/distributedSetting/recordTiming";
import {RecordManagementState} from "@/store/distributedSetting/recordManagement";
import {RecordSystemState} from "@/store/distributedSetting/recordSystem";
import {WebSocketState} from "@/store/distributedSetting/websocket";

import {ServicePendingState} from "@/store/logisticsService/servicePending";
import {AddServiceState} from "@/store/logisticsService/addService";
import {ServiceDetailsState} from "@/store/logisticsService/serviceDetails";
import {ServiceProcessingState} from "@/store/logisticsService/serviceProcessing";
import {ServiceProcessedState} from "@/store/logisticsService/serviceProcessed";
import {ServiceRejectedState} from "@/store/logisticsService/serviceRejected";
import {ServiceCancelledState} from "@/store/logisticsService/serviceCancelled";
import {OrderPendingState} from "@/store/logisticsService/orderPending";
import {OrderDetailsState} from "@/store/logisticsService/orderDetails";
import {OrderProcessingState} from "@/store/logisticsService/orderProcessing";
import {OrderProcessedState} from "@/store/logisticsService/orderProcessed";
import {OrderRejectedState} from "@/store/logisticsService/orderRejected";
import {LogisticsPersonneState} from "@/store/logisticsService/logisticsPersonne";
import {GoodsClassificationState} from "@/store/logisticsService/goodsClassification";
import {GoodsListState} from "@/store/logisticsService/goodsList";

import {PaperlessMeetingState} from '@/store/paperless/meeting';
import {PaperlessServerState} from '@/store/paperless/server';
import {PaperlessUserState} from '@/store/paperless/user';

import {VideoMeetinglistTableState} from '@/store/video/meetingListTable';
import {VideoMeetingListEditorState} from '@/store/video/meetingListEditor';
import {VideoMeetingTemplateTableState} from '@/store/video/meetingTemplateTable';
import {VideoMeetingListDetailState} from '@/store/video/meetingListDetail';
import {VideoVcsEnterpriselistTableState} from '@/store/video/vcsEnterpriseListTable';
import {VideoVcsEnterpriseEditorState} from '@/store/video/vcsEnterpriseListEditor';
import {VideoVcsUserEditorState} from '@/store/video/vcsUserListEditor';
import {VideoVcsUserListTableState} from '@/store/video/vcsUserListTable';

import {ProcessSystemState} from '@/store/process/system';
import {ProcessExamineState} from '@/store/process/examine';
import {ProcessLaunchState} from '@/store/process/launch';
import {ProcessApprovalState} from '@/store/process/approval';

import {DetectorState} from '@/store/detector/detector';
import {DetectorEditorState} from '@/store/detector/detectorEditor';
import {ConfigEditorState} from '@/store/detector/configEditor';
import {DetectorLogsState} from '@/store/detector/detectorlogs';
import {AttendanceOverviewState} from '@/store/attendanceChecking/attendanceOverview';
import {AttendanceStatisticsState} from '@/store/attendanceChecking/attendanceStatistics';
import {MyAttendanceOverviewState} from '@/store/attendanceChecking/myAttendanceOverview';
import {MyAttendanceStatisticsState} from '@/store/attendanceChecking/myAttendanceStatistics';
import {AttendanceRulesState} from '@/store/attendanceChecking/attendanceRules';
import {OvertimeRulesState} from '@/store/attendanceChecking/overtimeRules';
import {CardReplacementState} from '@/store/attendanceChecking/cardReplacement';
import {HolidayRulesState} from '@/store/attendanceChecking/holidayRules';
import {LeaveBalanceState} from '@/store/attendanceChecking/leaveBalance';
import {AttendanceRecordsState} from '@/store/attendanceChecking/attendanceRecords';

import {VisitorState} from '@/store/visitor';

import {AssetsIndexState} from "@/store/assets/index";
import {AssetsSortState} from "@/store/assets/sort";
import {AssetsSpareSuperviseState} from "@/store/assets/spareSupervise";
import {AssetsConsumablesState} from "@/store/assets/consumables";
import {AssetsFixedSuperviseState} from "@/store/assets/fixedSupervise";
import {AssetsFixedAskfroState} from "@/store/assets/fixedAskfro";
import {AssetsFixedCheckState} from "@/store/assets/fixedCheck";

import {QuestionManagementState} from "@/store/itsmSystem/questionManagement";
import {EventManagementState} from "@/store/itsmSystem/eventManagement";
import {WorkOrderManagementState} from "@/store/itsmSystem/workOrderManagement";
import {ChangeManagementState} from "@/store/itsmSystem/changeManagement";
import {KnowledgeManagementState} from "@/store/itsmSystem/KnowledgeManagement";
import {ServiceGroupManagementState} from "@/store/itsmSystem/serviceGroupManagement";
import {ServiceGroupAuthorizationState} from "@/store/itsmSystem/serviceGroupAuthorization";
import {ServiceSettingState} from "@/store/itsmSystem/serviceSetting";
import {ServiceControlState} from "@/store/itsmSystem/serviceControl";

export interface MeetingStatisticRank {
    rank: number;
    avatar?: string;
    name: string;
    percent: number;
    time: number;
    count: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IState {
    Global: GlobalState;
    MeetingTimePicker: MeetingTimePickerState;
    MeetingList: MeetingListState;
    MeetingTemp: MeetingTempState;
    MeetingEditor: MeetingEditorState;
    MeetingStatistic: MeetingStatisticState;

    MeetingPersonalStatistic: MeetingPersonalStatisticState;
    MeetingEnterpriseStatistic: MeetingEnterpriseStatisticState;
    MeetingSetup: MeetingSetupState;
    
    MeetingSeat: MeetingSeatState;
    MeetingDetail: MeetingDetailState;
    MeetingRecord: MeetingRecordState;
    MeetingExtend: MeetingExtendState;
    MeetingAttendee: MeetingAttendeeState;
    SeatList: SeatListState;
    SeatRoom: SeatRoomState;
    VoteList: VoteListState;
    VoteEditor: VoteEditorState;
    VoteDetail: VoteDetailState;
    VoteRecord: VoteRecordState;
    AccessUserType: AccessUserTypState;
    AccessUserTypeEditor: UserTypeEditorState;
    AccessUserTypePeoEditor: UserTypePeoEditorState;
    AccessGroup: AccessGroupState;
    AccessGroupEditor: AccessGroupEditorState;
    AccessManage: AccessManageState;
    AccessManageEditor: AccessManageEditorState;
    AccessUserBlack: AccessUserBlackState;
    AccessUserBlackEditor: AccessUserBlackEditorState;
    AccessHolidayPass: AccessHolidayPassState;
    AccessHolidayPassEditor: AccessHolidayPassEditorState;
    AccessPassRecord: AccessPassRecordState;
    AccessPassRecordByRoom: AccessPassRecordByRoomState;
    AccessAdmin: AccessAdminState;
    AccessAdminEditor: AccessAdminEditorState;
    AccessVersion: AccessVersionState;
    AccessVersionEditor: AccessVersionEditorState;
    LogisticsList: LogisticsListState;
    LogisticsEditor: LogisticsEditorState;
    LogisticsDetail: LogisticsDetailState;
    LogisticsClassify: LogisticsClassifyState;
    LogisticsGoods: LogisticsGoodsState;
    GetVoucherInvoice: GetVoucherInvoiceState;
    VoucherInvoiceList: VoucherInvoiceListState;
    ShortMessageStatistic: ShortMessageStatisticState;
    VoucherCenter: VoucherCenterState;
    VoucherRecord: VoucherRecordState;
    ScheduleDate: ScheduleDateState;
    DevicesCard: DevicesCardState;
    DevicesControlEditor: DevicesControlEditorState;
    DoorScreen: DoorScreenState;
    DevicesTypeTable: DevicesTypeTableState;
    DevicesTypeEditor: DevicesTypeEditorState;
    DevicesRecordTable: DevicesRecordTableState;
    DevicesUserTable: DevicesUserTableState;
    ScenesEditor: ScenesEditorState;
    DevicesUserEditor: DevicesUserEditorState;
    DevicesZkEditor: DevicesZkEditorState;
    NopaperList: NopaperListState;   
    DepartmentEditor: DepartmentEditorState;
    EmployeeEditor: EmployeeEditorState;
    DepartmentList: DepartmentListState;
    EmployeeDetail: EmployeeDetailState;
    ImportUserEditor: ImportUserEditorState;
    AdjustmentEditor: AdjustmentEditorState;
    RolesEditor: RolesEditorState;
    RolesPeoEditor: RolesPeoEditorState;
    TransferEditor: TransferState;
    RolesLogs: RolesLogsState;
    MeetingRoom: MeetingRoomState;
    DeviceList: DeviceListState;
    ZoneManagement: ZoneManagementState;
    ZoneEditShow: ZoneEditShowState;
    AudioNameEditShow: AudioNameEditShowState;
    AudioManagement: AudioManagementState;
    PaperlessMeeting: PaperlessMeetingState;
    PaperlessServer: PaperlessServerState;
    PaperlessUser: PaperlessUserState;
    RecordingDevicesTable: RecordingDevicesTableState;
    RecordingDevicesEditor: RecordingDevicesEditorState;
    RecordingManagementTable: RecordingManagementTableState;
    RecordingManagementEditor: RecordingManagementEditorState;
    RecordingVideoTable: RecordingVideoTableState;
    RecordingVideoEditor: RecordingVideoEditorState;
    RecordingStockTable: RecordingStockTableState;
    RecordingStockEditor: RecordingStockEditorState;
    RecordingGuideEditor: RecordingGuideEditorState;
    RecordingVideoFileTable: RecordingVideoFileTableState;
    RecordingMovieEditor: RecordingMovieEditorState;
    RecordingSettings: RecordingSettingsState;

    VideoMeetinglistTable: VideoMeetinglistTableState;
    VideoMeetingListEditor: VideoMeetingListEditorState;
    VideoMeetingTemplateTable: VideoMeetingTemplateTableState;
    VideoMeetingListDetail: VideoMeetingListDetailState;
    VideoVcsEnterpriselistTable: VideoVcsEnterpriselistTableState;
    VideoVcsEnterpriseEditor: VideoVcsEnterpriseEditorState;
    VideoVcsUserEditor: VideoVcsUserEditorState;
    VideoVcsUserListTable: VideoVcsUserListTableState;

    ProcessSystem: ProcessSystemState;
    ProcessExamine: ProcessExamineState;
    ProcessLaunch: ProcessLaunchState;
    ProcessApproval: ProcessApprovalState;
    InputBox: InputBoxState;
    OutputBox: OutputBoxState;
    WallManagement: WallManagementState;
    DistributedCenter: DistributedCenterState;
    RecordSetting: RecordSetState;
    RecordNormal: RecordNormalState;
    RecordTiming: RecordTimingState;
    RecordManagement: RecordManagementState;

    Detector: DetectorState;
    DetectorEditor: DetectorEditorState;
    DetectorConfigEditor: ConfigEditorState;
    DetectorLogs: DetectorLogsState;
    BroadcastTask: BroadcastTaskState;
    RecordSystem: RecordSystemState;
    WebSocket: WebSocketState;
    Visitor: VisitorState;
    ServicePending: ServicePendingState;
    AddService: AddServiceState;
    ServiceDetails: ServiceDetailsState;
    ServiceProcessing: ServiceProcessingState;
    ServiceProcessed: ServiceProcessedState;
    ServiceRejected: ServiceRejectedState;
    ServiceCancelled: ServiceCancelledState;
    OrderPending: OrderPendingState;
    OrderDetails: OrderDetailsState;
    OrderProcessing: OrderProcessingState;
    OrderProcessed: OrderProcessedState;
    OrderRejected: OrderRejectedState;
    LogisticsPersonne: LogisticsPersonneState;

    AssetsIndex: AssetsIndexState;
    AssetsSort: AssetsSortState;
    AssetsSpareSupervise: AssetsSpareSuperviseState;
    AssetsConsumables: AssetsConsumablesState;
    AssetsFixedSupervise: AssetsFixedSuperviseState;
    AssetsFixedAskfro: AssetsFixedAskfroState;
    AssetsFixedCheck: AssetsFixedCheckState;
    
    GoodsClassification: GoodsClassificationState;
    GoodsList: GoodsListState;
    AttendanceOverview: AttendanceOverviewState;
    AttendanceStatistics: AttendanceStatisticsState;
    MyAttendanceOverview: MyAttendanceOverviewState;
    MyAttendanceStatistics: MyAttendanceStatisticsState;
    AttendanceRules: AttendanceRulesState;

    QuestionManagement: QuestionManagementState;
    EventManagement: EventManagementState;
    WorkOrderManagement: WorkOrderManagementState;
    ChangeManagement: ChangeManagementState;
    KnowledgeManagement: KnowledgeManagementState;
    ServiceGroupManagement: ServiceGroupManagementState;
    ServiceGroupAuthorization: ServiceGroupAuthorizationState;
    ServiceSetting: ServiceSettingState;
    ServiceControl: ServiceControlState;
    OvertimeRules: OvertimeRulesState;
    CardReplacement: CardReplacementState;
    HolidayRules: HolidayRulesState;
    LeaveBalance: LeaveBalanceState;
    AttendanceRecords: AttendanceRecordsState;
}

export function makeStore(): Store {
    return createStore(reducers);
}
 