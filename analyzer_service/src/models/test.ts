interface Test {
    id: string;
    roleId: string;
    questions: Array<Question>;
    createdAt: number;
}

interface Question {
    id: string;
    question: string;
    imageS3Uri: string;
    context: string;
}

export { Question, Test }