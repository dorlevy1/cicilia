export const separateActiveDisabled = <T extends { isActive: boolean }>(items: T[]): { active: T[], disabled: T[] } => {
    const active = items?.filter(item => item.isActive) || [];
    const disabled = items?.filter(item => !item.isActive) || [];
    return {active, disabled};
};