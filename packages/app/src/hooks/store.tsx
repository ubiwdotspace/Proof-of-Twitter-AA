export const SET_TX_HASH = 'SET_TX_HASH';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const SET_ETHERUM_SMAADDRESS = 'SET_ETHERUM_ADDRESS';
export const SET_EMAIL_FULL = 'SET_EMAIL_FULL'
export const SET_PROOF = 'SET_PROOF'
export const SET_PUBLIC_SIGNALS = 'SET_PUBLIC_SIGNALS'

// Define interface for state
interface State {
    txHash: string;
    error: string;
    loading: boolean;
    ethereumSMAAddress: string;
    emailFull: string;
    proof: string;
    publicSignals: string
}

// Define action types
type Action =
    | { type: typeof SET_TX_HASH; payload: string }
    | { type: typeof SET_ERROR; payload: string }
    | { type: typeof SET_LOADING; payload: boolean }
    | { type: typeof SET_ETHERUM_SMAADDRESS, payload: string }
    | { type: typeof SET_EMAIL_FULL, payload: string }
    | { type: typeof SET_PROOF, payload: string }
    | { type: typeof SET_PUBLIC_SIGNALS, payload: string };

// Define reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case SET_TX_HASH:
            return {
                ...state,
                txHash: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_ETHERUM_SMAADDRESS:
            return {
                ...state,
                ethereumSMAAddress: action.payload,
            }
        case SET_EMAIL_FULL:
            return {
                ...state,
                emailFull: action.payload,
            }
        case SET_PROOF:
            return {
                ...state,
                proof: action.payload,
            }
        case SET_PUBLIC_SIGNALS:
            return {
                ...state,
                publicSignals: action.payload,
            }
        default:
            return state;
    }
};

export default reducer;
