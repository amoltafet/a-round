
type User = {
    id: number;
    name: string;
    email: string;
    username: string;
    avatar: string;
    connections: number;
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


for (let i = 4; i <= 22; i++) {
    mockUsers.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        username: `user${i}`,
        avatar: `https://randomuser.me/api/portraits/men/${i}.jpg`,
        connections: Math.floor(Math.random() * 1000),
    });
}

export default mockUsers;
