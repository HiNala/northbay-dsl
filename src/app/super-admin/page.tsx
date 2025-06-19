"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { 
  Crown,
  Server, 
  Database, 
  Shield, 
  Users,
  Activity,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  Globe,
  Lock,
  Eye,
  Zap,
  FileText,
  Settings,
  TrendingUp,
  TrendingDown,
  Wifi,
  Smartphone,
  Monitor,
  Key,
  UserCheck,
  UserX,
  AlertCircle
} from "lucide-react"

export default function SuperAdminDashboard() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center space-x-3">
          <Crown className="h-8 w-8 text-luxury-gold-500" />
          <div>
            <h1 className="text-3xl font-light text-charcoal-900 font-serif">Super Admin Control Center</h1>
            <p className="text-charcoal-600">
              {today} • System Administration Dashboard
            </p>
          </div>
        </div>
      </motion.div>

      {/* Critical System Status */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="border-l-4 border-l-green-500 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Server className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Excellent
              </span>
              All systems operational
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12
              </span>
              since last hour
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-orange-500 bg-orange-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <Shield className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Require attention
              </span>
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Load</CardTitle>
            <Database className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">67%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Normal
              </span>
              Optimal performance
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-red-500 bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">0</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                All Clear
              </span>
              No critical issues
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Control Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* System Resources */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">System Resources</CardTitle>
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>Real-time system performance metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium flex items-center">
                    <Cpu className="h-4 w-4 mr-2 text-blue-500" />
                    CPU Usage
                  </span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">Normal</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium flex items-center">
                    <HardDrive className="h-4 w-4 mr-2 text-green-500" />
                    Storage
                  </span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <Progress value={67} className="h-2" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Healthy</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium flex items-center">
                    <Wifi className="h-4 w-4 mr-2 text-purple-500" />
                    Network
                  </span>
                  <span className="text-sm text-muted-foreground">23%</span>
                </div>
                <Progress value={23} className="h-2" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Management */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">User Management</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>User accounts and access control</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <UserCheck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Active Users</p>
                      <p className="text-sm text-muted-foreground">Currently online</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">156</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-luxury-gold-600" />
                    <div>
                      <p className="font-medium">Admin Users</p>
                      <p className="text-sm text-muted-foreground">Privileged access</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-3">
                    <UserX className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="font-medium">Suspended</p>
                      <p className="text-sm text-muted-foreground">Account violations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-red-600">3</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  Manage All Users
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Center */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Security Center</CardTitle>
                <Shield className="h-5 w-5 text-orange-500" />
              </div>
              <CardDescription>Security monitoring and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Unusual login pattern detected</p>
                    <p className="text-xs text-muted-foreground">User: admin@nbkb.com • 15 min ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Failed login attempts spike</p>
                    <p className="text-xs text-muted-foreground">IP: 192.168.1.* • 1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">SSL certificates updated</p>
                    <p className="text-xs text-muted-foreground">Auto-renewal successful</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Lock className="h-4 w-4 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Database backup completed</p>
                    <p className="text-xs text-muted-foreground">Size: 2.4GB • 2 hours ago</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Security Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Advanced Controls */}
      <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-charcoal-200 bg-charcoal-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-charcoal-600 rounded-lg">
                <Database className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-charcoal-700">Database Control</h3>
                <p className="text-sm text-charcoal-600">Manage system database</p>
              </div>
              <Button variant="outline" className="border-charcoal-300">
                Access
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-red-600 rounded-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-red-700">Emergency Lock</h3>
                <p className="text-sm text-red-600">System-wide lockdown</p>
              </div>
              <Button variant="outline" className="border-red-300">
                Lock
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-600 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-orange-700">System Restart</h3>
                <p className="text-sm text-orange-600">Reboot all services</p>
              </div>
              <Button variant="outline" className="border-orange-300">
                Restart
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-700">Audit Trail</h3>
                <p className="text-sm text-blue-600">View system logs</p>
              </div>
              <Button variant="outline" className="border-blue-300">
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent System Events */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent System Events</CardTitle>
              <Clock className="h-5 w-5 text-gray-500" />
            </div>
            <CardDescription>Latest system activities and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Automated backup completed</p>
                    <p className="text-xs text-muted-foreground">2.4GB • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-4 w-4 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New admin user created</p>
                    <p className="text-xs text-muted-foreground">manager@nbkb.com • 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Settings className="h-4 w-4 text-purple-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">System configuration updated</p>
                    <p className="text-xs text-muted-foreground">Security settings • 6 hours ago</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View Complete System Log
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
} 