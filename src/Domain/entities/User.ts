export interface UserProps {
    id: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User {
    private constructor(private props: UserProps) { }

    static create(props: Omit<UserProps, 'createdAt' | 'updatedAt'>): User {
        const now = new Date();
        return new User({
            ...props,
            createdAt: now,
            updatedAt: now,
        });
    }

    static reconstitute(props: UserProps): User {
        return new User(props);
    }

    // Getters
    getId(): string {
        return this.props.id;
    }

    getEmail(): string {
        return this.props.email;
    }

    getCreatedAt(): Date {
        return this.props.createdAt;
    }

    getUpdatedAt(): Date {
        return this.props.updatedAt;
    }

    toPlainObject(): UserProps {
        return { ...this.props };
    }
}
