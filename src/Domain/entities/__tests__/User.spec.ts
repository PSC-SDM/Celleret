import { User, UserProps } from '../User';

describe('User Entity', () => {
    const mockUserProps: Omit<UserProps, 'createdAt' | 'updatedAt'> = {
        id: 'user-123',
        email: 'john.doe@example.com',
    };

    describe('create', () => {
        it('should create a new user with all properties', () => {
            const user = User.create(mockUserProps);

            expect(user.getId()).toBe('user-123');
            expect(user.getEmail()).toBe('john.doe@example.com');
        });

        it('should set createdAt and updatedAt timestamps', () => {
            const beforeCreate = new Date();
            const user = User.create(mockUserProps);
            const afterCreate = new Date();

            expect(user.getCreatedAt()).toBeInstanceOf(Date);
            expect(user.getUpdatedAt()).toBeInstanceOf(Date);
            expect(user.getCreatedAt().getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
            expect(user.getCreatedAt().getTime()).toBeLessThanOrEqual(afterCreate.getTime());
            expect(user.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(beforeCreate.getTime());
            expect(user.getUpdatedAt().getTime()).toBeLessThanOrEqual(afterCreate.getTime());
        });

        it('should set the same timestamp for createdAt and updatedAt on creation', () => {
            const user = User.create(mockUserProps);

            expect(user.getCreatedAt().getTime()).toBe(user.getUpdatedAt().getTime());
        });
    });

    describe('reconstitute', () => {
        it('should reconstitute a user from stored data', () => {
            const storedProps: UserProps = {
                ...mockUserProps,
                createdAt: new Date('2020-01-01T10:00:00Z'),
                updatedAt: new Date('2020-06-15T14:30:00Z'),
            };

            const user = User.reconstitute(storedProps);

            expect(user.getId()).toBe(storedProps.id);
            expect(user.getEmail()).toBe(storedProps.email);
            expect(user.getCreatedAt()).toEqual(storedProps.createdAt);
            expect(user.getUpdatedAt()).toEqual(storedProps.updatedAt);
        });

        it('should preserve the exact timestamps from stored data', () => {
            const createdAt = new Date('2019-05-20T08:00:00Z');
            const updatedAt = new Date('2023-10-10T16:45:00Z');

            const storedProps: UserProps = {
                ...mockUserProps,
                createdAt,
                updatedAt,
            };

            const user = User.reconstitute(storedProps);

            expect(user.getCreatedAt()).toBe(createdAt);
            expect(user.getUpdatedAt()).toBe(updatedAt);
        });
    });

    describe('toPlainObject', () => {
        it('should return a plain object with all properties', () => {
            const user = User.create(mockUserProps);
            const plainObject = user.toPlainObject();

            expect(plainObject).toHaveProperty('id', mockUserProps.id);
            expect(plainObject).toHaveProperty('email', mockUserProps.email);
            expect(plainObject).toHaveProperty('createdAt');
            expect(plainObject).toHaveProperty('updatedAt');
            expect(plainObject.createdAt).toBeInstanceOf(Date);
            expect(plainObject.updatedAt).toBeInstanceOf(Date);
        });

        it('should return a new object, not a reference to internal state', () => {
            const user = User.create(mockUserProps);
            const plainObject1 = user.toPlainObject();
            const plainObject2 = user.toPlainObject();

            expect(plainObject1).not.toBe(plainObject2);
            expect(plainObject1).toEqual(plainObject2);
        });
    });

    describe('Getters', () => {
        it('should return correct id', () => {
            const user = User.create({ ...mockUserProps, id: 'unique-id-789' });

            expect(user.getId()).toBe('unique-id-789');
        });

        it('should return correct email', () => {
            const user = User.create({ ...mockUserProps, email: 'test@domain.com' });

            expect(user.getEmail()).toBe('test@domain.com');
        });

        it('should return Date objects for timestamps', () => {
            const user = User.create(mockUserProps);

            expect(user.getCreatedAt()).toBeInstanceOf(Date);
            expect(user.getUpdatedAt()).toBeInstanceOf(Date);
        });
    });

    describe('Email validation scenarios', () => {
        it('should accept valid email formats', () => {
            const validEmails = [
                'user@example.com',
                'user.name@example.com',
                'user+tag@example.co.uk',
                'user_name@sub.example.com',
            ];

            validEmails.forEach((email) => {
                const user = User.create({ ...mockUserProps, email });
                expect(user.getEmail()).toBe(email);
            });
        });
    });

    describe('Immutability', () => {
        it('should not allow direct modification of internal state', () => {
            const user = User.create(mockUserProps);
            const originalEmail = user.getEmail();
            const plainObject = user.toPlainObject();

            // Attempt to modify the plain object
            plainObject.email = 'modified@example.com';

            // Original user should remain unchanged
            expect(user.getEmail()).toBe(originalEmail);
        });
    });
});
