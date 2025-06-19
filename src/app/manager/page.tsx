"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  MessageSquare, 
  Calendar,
  Target,
  Award,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Activity,
  Timer,
  MapPin
} from "lucide-react"

export default function ManagerDashboard() {
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
        staggerChildren: 0.1
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
        <h1 className="text-2xl sm:text-3xl font-light text-charcoal-900 font-serif">Manager Dashboard</h1>
        <p className="text-sm sm:text-base text-charcoal-600">
          {today} • Business Operations Overview
        </p>
      </motion.div>

      {/* Key Metrics Row */}
      <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-luxury-gold-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-luxury-gold-600">$125,340</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leads</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">15</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +3
              </span>
              since yesterday
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Performance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5%
              </span>
              vs last week
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projects Active</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -2
              </span>
              from last week
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Goal Progress */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Monthly Goals</CardTitle>
                <Target className="h-5 w-5 text-luxury-gold-500" />
              </div>
              <CardDescription>Track progress toward monthly targets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Revenue Target</span>
                  <span className="text-sm text-muted-foreground">$125K / $150K</span>
                </div>
                <Progress value={83} className="h-2" />
                <Badge variant="secondary" className="bg-green-100 text-green-700">83% Complete</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">New Leads</span>
                  <span className="text-sm text-muted-foreground">28 / 40</span>
                </div>
                <Progress value={70} className="h-2" />
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">70% Complete</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Team Training</span>
                  <span className="text-sm text-muted-foreground">6 / 8</span>
                </div>
                <Progress value={75} className="h-2" />
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">75% Complete</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Performance */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Team Performance</CardTitle>
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <CardDescription>Individual team member metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">SC</span>
                    </div>
                    <div>
                      <p className="font-medium">Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Lead Designer</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-green-600">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="font-medium">4.9</span>
                    </div>
                    <p className="text-xs text-muted-foreground">5 projects</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">MJ</span>
                    </div>
                    <div>
                      <p className="font-medium">Mike Johnson</p>
                      <p className="text-sm text-muted-foreground">Sales Associate</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-blue-600">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="font-medium">4.7</span>
                    </div>
                    <p className="text-xs text-muted-foreground">8 leads</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">AL</span>
                    </div>
                    <div>
                      <p className="font-medium">Anna Lee</p>
                      <p className="text-sm text-muted-foreground">Project Coordinator</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-purple-600">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="font-medium">4.8</span>
                    </div>
                    <p className="text-xs text-muted-foreground">3 projects</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Full Team Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activities */}
        <motion.div variants={itemVariants}>
          <Card className="col-span-1">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Activities</CardTitle>
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              <CardDescription>Latest team and business updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Kenwood project completed</p>
                    <p className="text-xs text-muted-foreground">Sarah Chen • 2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-4 w-4 text-blue-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New lead from San Rafael</p>
                    <p className="text-xs text-muted-foreground">Mike Johnson • 4 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="h-4 w-4 text-purple-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Team meeting scheduled</p>
                    <p className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Project deadline approaching</p>
                    <p className="text-xs text-muted-foreground">Petaluma Bath • Due in 3 days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Award className="h-4 w-4 text-luxury-gold-500 mt-1" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Monthly goal achieved</p>
                    <p className="text-xs text-muted-foreground">Revenue target reached</p>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Action Cards */}
      <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
        <Card className="border-luxury-gold-200 bg-luxury-gold-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-luxury-gold-500 rounded-lg">
                <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-luxury-gold-700">Weekly Report</h3>
                <p className="text-sm text-luxury-gold-600">Generate comprehensive analytics</p>
              </div>
              <Button variant="outline" className="border-luxury-gold-300 w-full sm:w-auto">
                Generate
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-700">Team Meeting</h3>
                <p className="text-sm text-blue-600">Schedule weekly sync</p>
              </div>
              <Button variant="outline" className="border-blue-300 w-full sm:w-auto">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 bg-green-500 rounded-lg">
                <Target className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-green-700">Set Goals</h3>
                <p className="text-sm text-green-600">Define next month's targets</p>
              </div>
              <Button variant="outline" className="border-green-300 w-full sm:w-auto">
                Set Goals
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
} 