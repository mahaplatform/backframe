module.exports = {
  label: 'Team', rights: ['team.admin_team'], icon: 'setting', items: [
    { label: 'Activities', rights: ['team.admin_team'], route: '/admin/team/activities' },
    { label: 'Apps', rights: ['team.admin_team'], route: '/admin/team/apps' },
    { label: 'Roles', rights: ['team.admin_team'], route: '/admin/team/roles' },
    { label: 'Settings', rights: ['team.admin_team'], route: '/admin/team/settings' },
    { label: 'Users', rights: ['team.admin_team'], route: '/admin/team/users' }
  ]
}
