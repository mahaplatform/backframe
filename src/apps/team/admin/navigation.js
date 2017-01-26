module.exports = {
  label: 'Team', rights: ['ADMIN TEAM'], icon: 'setting', items: [
    { label: 'Activities', rights: ['ADMIN TEAM'], route: '/admin/team/activities' },
    { label: 'Apps', rights: ['ADMIN TEAM'], route: '/admin/team/apps' },
    { label: 'Roles', rights: ['ADMIN TEAM'], route: '/admin/team/roles' },
    { label: 'Settings', rights: ['ADMIN TEAM'], route: '/admin/team/settings' },
    { label: 'Users', rights: ['ADMIN TEAM'], route: '/admin/team/users' }
  ]
}
