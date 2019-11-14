export {
    postSignUp,
    postSignIn,
    getSignOut,
    getVerifyCode,
    getUserByUserId,
    getUserByEmail,
    getUserByStudentId,
    getUserByNickname,
    checkSignIn,
    checkEmailDuplicate,
    checkNicknameDuplicate,
    checkStudentIdDuplicate
} from './user';

export {
    postDocument,
    getDocument,
    putDocument,
    // postPhoto,
    // getPhoto,
    // putPhoto,
    getDebates,
    postDebate,
    getDebate,
    // getDebateComments,
    // postDebateComment,
} from './tellme';

export {
    postPetition,
    getAllPetitions,
    getPetition,
    getPetitionByTitle,
    // getMyPetitions,
    getPetitionComments,
    postPetitionComment,
    putPetitionVote,       // Wiki에 추가 필요
    // Statistic에 해당하는 것은 아직 안 만듦
} from './hearus';