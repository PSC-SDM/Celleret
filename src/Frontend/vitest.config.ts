export default {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    moduleNameMapping: {
        '^@domain/(.*)$': '<rootDir>/../Domain/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@/components/(.*)$': '<rootDir>/src/presentation/components/$1',
        '^@/pages/(.*)$': '<rootDir>/src/presentation/pages/$1',
        '^@/hooks/(.*)$': '<rootDir>/src/presentation/hooks/$1',
        '^@/store/(.*)$': '<rootDir>/src/presentation/store/$1',
        '^@/infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        '^@/shared/(.*)$': '<rootDir>/src/shared/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
}