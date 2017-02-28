module.exports = {
  label: 'Team', icon: 'setting', items: [
    { label: 'Activities', rights: ['team.manage_people'], route: '/admin/team/activities' },
    { label: 'Apps', rights: ['team.manage_apps'], route: '/admin/team/apps' },
    { label: 'Roles', rights: ['team.manage_people'], route: '/admin/team/roles' },
    { label: 'Settings', rights: ['team.manage_apps'], route: '/admin/team/settings' },
    { label: 'Users', rights: ['team.manage_people'], route: '/admin/team/users' }
  ]
}
