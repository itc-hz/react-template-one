import {createStore, Store} from 'redux';
import reducers from '@/reducer';

import {GlobalState} from '@/store/global/global';

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

    QuestionManagement: QuestionManagementState;
    EventManagement: EventManagementState;
    WorkOrderManagement: WorkOrderManagementState;
    ChangeManagement: ChangeManagementState;
    KnowledgeManagement: KnowledgeManagementState;
    ServiceGroupManagement: ServiceGroupManagementState;
    ServiceGroupAuthorization: ServiceGroupAuthorizationState;
    ServiceSetting: ServiceSettingState;
    ServiceControl: ServiceControlState;
}

export function makeStore(): Store {
    return createStore(reducers);
}
 