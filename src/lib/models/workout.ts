
export type AnyWorkout =
    | IRunWorkout
    | IBikeWorkout
    | IBikeOverUnderWorkout
    | ISwimWorkout
    | ISoccerWorkout
    | IRestWorkout
    | IBrickWorkout
    | IStrengthWorkout

export type WorkoutType = 'Run' | 'Bike' | 'Swim' | 'Soccer' | 'Rest' | 'Brick' | 'Strength'

export type EnrichedWorkout = AnyWorkout & {
    targetPace?: string;
    targetPower?: string;
    targetCadence?: string;
    targetRPE?: string;
    zone?: string;
    intervals?: Array<{
        step: number;
        name: string;
        description: string;
        isMain?: boolean;
    }>;
    intensityProfile?: number[];
}

export interface IWarmup {
    time?: number        // seconds
    distance?: number    // meters
    description?: string
}

export interface ICoolDown {
    time?: number
    distance?: number
    description?: string
}

export interface IMainSetBase {
    sets?: number
    rest?: number        // seconds
    description?: string
}

export interface IWorkout {
    day: string
    date: string
    fullDate: string

    type: WorkoutType
    completed: boolean

    title: string
    subtitle?: string
    description: string

    duration: number     // seconds
    distance?: number    // km (optional, not all workouts have it)

    workout?: {
        warmup?: IWarmup
        main: unknown      // overridden in sport-specific interfaces
        coolDown?: ICoolDown
    }
}

export interface IRunMainSet extends IMainSetBase {
    distance?: number    // meters
    time?: number        // seconds
    pace?: string        // "4:05/km"
    description?: string
}

export interface IRunWorkout extends IWorkout {
    type: 'Run'
    workout: {
        warmup?: IWarmup
        main: IRunMainSet
        coolDown?: ICoolDown
    }
}

export interface IBikeMainSet extends IMainSetBase {
    time?: number        // seconds
    watts?: string       // "88–90% FTP"
    restWatts?: string   // "65% FTP"
    description?: string
}

export interface IBikeWorkout extends IWorkout {
    type: 'Bike'
    workout: {
        warmup?: IWarmup
        main: IBikeMainSet
        coolDown?: ICoolDown
    }
}

export interface IBikeOverUnderBlock {
    time: number         // seconds
    watts: string        // "105% FTP" | "95% FTP"
    description?: string
}

export interface IBikeOverUnderMainSet {
    sets: number

    on: IBikeOverUnderBlock    // hard effort
    off: IBikeOverUnderBlock   // easier effort

    rest: number               // rest between sets (seconds)
    description?: string
}

export interface IBikeOverUnderWorkout extends IWorkout {
    type: 'Bike'
    workout: {
        warmup?: IWarmup
        main: IBikeOverUnderMainSet
        coolDown?: ICoolDown
    }
}


export interface ISwimDrill {
    distance: number
    drill: string
    sets?: number
    rest?: number
}

export interface ISwimMainSet extends IMainSetBase {
    distance: number
    RPE?: number
    description?: string
}

export interface ISwimWorkout extends IWorkout {
    type: 'Swim'
    workout: {
        warmup?: IWarmup
        drill?: ISwimDrill
        main: ISwimMainSet
        coolDown?: ICoolDown
    }
}

export interface ISoccerWorkout extends IWorkout {
    type: 'Soccer'
}

export interface IRestWorkout extends IWorkout {
    type: 'Rest'
}

export interface IBrickWorkout extends IWorkout {
    type: 'Brick'
}

export interface IStrengthMainSet extends IMainSetBase {
    exercises: string[]
}

export interface IStrengthWorkout extends IWorkout {
    type: 'Strength'
    workout: {
        warmup?: IWarmup
        main: IStrengthMainSet
        coolDown?: ICoolDown
    }
}









