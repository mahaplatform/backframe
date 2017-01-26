import React from 'react'
import { IndexRoute, Route } from 'react-router'
import Root from './root'
import Socket from 'admin/components/socket'
import Host from 'admin/components/host'
import Admin from 'admin/components/admin'
import Transition from 'admin/views/transition'
import Signin from 'admin/views/signin'
import Activation from 'admin/views/activation'
import ResetClaim from 'admin/views/reset/claim'
import ResetSecurity from 'admin/views/reset/security'
import ResetPassword from 'admin/views/reset/password'
import Notifications from 'admin/components/notifications'
import Flash from 'admin/components/flash'
import History from 'admin/components/container'
import Container from 'admin/components/history'
import Modal from 'admin/components/modal'
import Drawer from 'admin/components/drawer'
import Tray from 'admin/components/tray'
import Tasks from 'admin/components/tasks'
import Chrome from 'admin/components/chrome'
import Panel from 'admin/views/panel'
import Dashboard from 'admin/views/dashboard'
import NotFound from 'admin/views/not_found'
import Team from 'apps/team/admin/client'


export default (
  <Route component={ Root }>
    <Route component={ Socket }>
      <Route component={ Notifications }>
        <Route component={ Host }>
          <Route component={ Flash }>
            <Route component={ Admin }>
              <Route component={ Transition }>
                <Route component={ Signin } path="admin/signin" />
                <Route component={ Activation } path="admin/activation/:id" />
                <Route component={ ResetSecurity } path="admin/reset/security" />
                <Route component={ ResetPassword } path="admin/reset/password" />
                <Route component={ ResetClaim } path="admin/reset/:id" />
              </Route>
              <Route component={ History }>
                <Route component={ Container } path="admin">
                  <Route component={ Modal }>
                    <Route component={ Drawer }>
                      <Route component={ Tray }>
                        <Route component={ Tasks }>
                          <Route component={ Chrome }>
                          <Route component={ Transition }>
                            <Route component={ Panel }>
                              <IndexRoute component={ Dashboard } />
                              <Route path="team">
                                { Team }
                              </Route>
                              <Route path="*" component={ NotFound }/>
                            </Route>
                          </Route>
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Route>
  </Route>
)
