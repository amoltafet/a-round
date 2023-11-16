
type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string;
    connections: number;
};

type MainUser = {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string;
    connections: MainUser[];
    pokes: MainUser[];
    requests: MainUser[];
    images: string[3];
    socials: string[];
    privateProfile: boolean | true;
    visibility: boolean | true;
    moreInformation: {
        relationshipStatus: string;
        interests: string[];
        bio: string;
        school: string;
        work: string;
    }
    groups: string[];
    notifications: Notification[];
    blocked: MainUser[];
};



type Notification = {
    id: number;
    title: string;
    content: string;
    time: string;
    read: boolean;
};

const mockUsers: User[] = [
    {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        connections: 42,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        username: "janesmith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        connections: 225,
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        username: "bobjohnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        connections: 112,
    },
];


const randomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

for (let i = 4; i <= 22; i++) {
        const randomChars = randomString(5);
        mockUsers.push({
                id: i,
                name: `User ${i} ${randomChars}`,
                email: `user${i}${randomChars}@example.com`,
                username: `user${i}${randomChars}`,
                avatar: `https://randomuser.me/api/portraits/men/${i}.jpg`,
                connections: Math.floor(Math.random() * 1000),
        });
}

export default mockUsers;
