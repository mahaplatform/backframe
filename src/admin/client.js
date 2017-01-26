import React from 'react'
import { Route } from 'react-router'
import Root from './root'
import Socket from 'admin/components/socket'
import Host from 'admin/components/host'
import Admin from 'admin/components/admin'
import Notifications from 'admin/components/notifications'
import Flash from 'admin/components/flash'
import Session from './views/session'
import History from 'admin/components/container'
import Container from 'admin/components/history'
import Modal from 'admin/components/modal'
import Drawer from 'admin/components/drawer'
import Tray from 'admin/components/tray'
import Tasks from 'admin/components/tasks'
import Chrome from 'admin/components/chrome'
import Apps from 'admin/views/apps'

export default (
  <Route component={ Root }>
    <Route component={ Socket }>
      <Route component={ Notifications }>
        <Route component={ Host }>
          <Route component={ Flash }>
            <Route component={ Admin }>
              { Session }
              <Route component={ History }>
                <Route component={ Container } path="admin">
                  <Route component={ Modal }>
                    <Route component={ Drawer }>
                      <Route component={ Tray }>
                        <Route component={ Tasks }>
                          <Route component={ Chrome }>
                            { Apps }
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
