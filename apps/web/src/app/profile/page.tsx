'use client';

import {
  Activity,
  Bell,
  Calendar,
  ChevronDown,
  Mail,
  MapPin,
  Settings,
  TrendingUp,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  achievements,
  activityData,
  codeData,
  languageData,
  messagesData,
  monthlyStatsData,
  productivityData,
  recentActivity,
  sidebarItems,
  skillsData,
} from './charts-sample-data';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* hardcoded gray-50 background */}
      {/* Header */}
      <motion.header
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between border-gray-200 border-b bg-white px-6 py-4"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-gray-900">
              {/* hardcoded gray-900 */}
              <span className="font-bold text-white text-xs">W</span> {/* hardcoded white text */}
            </div>
            <span className="font-semibold text-gray-900 text-xl">Windsurf</span> {/* hardcoded gray-900 text */}
          </div>

          <nav className="flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600 text-sm">PRODUCTS</span> {/* hardcoded gray-600 */}
              <ChevronDown className="h-4 w-4 text-gray-600" /> {/* hardcoded gray-600 */}
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600 text-sm">ENTERPRISE</span> {/* hardcoded gray-600 */}
              <ChevronDown className="h-4 w-4 text-gray-600" /> {/* hardcoded gray-600 */}
            </div>
            <span className="font-medium text-gray-600 text-sm">PRICING</span> {/* hardcoded gray-600 */}
            <span className="font-medium text-gray-600 text-sm">BLOG</span> {/* hardcoded gray-600 */}
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600 text-sm">RESOURCES</span> {/* hardcoded gray-600 */}
              <ChevronDown className="h-4 w-4 text-gray-600" /> {/* hardcoded gray-600 */}
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-600 text-sm">COMPANY</span> {/* hardcoded gray-600 */}
              <ChevronDown className="h-4 w-4 text-gray-600" /> {/* hardcoded gray-600 */}
            </div>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">We're joining forces with Cognition</span> {/* hardcoded gray-600 */}
          <span className="cursor-pointer font-medium text-gray-600 text-sm underline">LEARN MORE</span>
          {/* hardcoded gray-600 */}
          <X className="h-4 w-4 cursor-pointer text-gray-600" /> {/* hardcoded gray-600 */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback>MY</AvatarFallback>
          </Avatar>
          <Button className="bg-teal-500 px-6 font-medium text-white hover:bg-teal-600">DOWNLOAD</Button>
          {/* hardcoded teal colors */}
        </div>
      </motion.header>
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="min-h-screen w-64 border-gray-200 border-r bg-white p-6"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="space-y-6">
            {sidebarItems.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <span className="font-medium text-gray-500 text-sm">{section.section}</span> {/* hardcoded gray-500 */}
                <div className="mt-2 space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <div
                      className={`flex cursor-pointer items-center space-x-2 rounded px-2 py-1 transition-colors ${
                        item.active ? 'bg-teal-500 font-medium text-white' : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      key={itemIndex}
                    >
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-gray-200 border-t pt-6">
              {/* hardcoded gray-200 border */}
              <div className="space-y-2">
                <div className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-gray-600 transition-colors hover:bg-gray-100">
                  {/* hardcoded gray colors */}
                  <span className="text-sm">Referrals</span>
                </div>
                <div className="flex cursor-pointer items-center space-x-2 rounded px-2 py-1 text-gray-600 transition-colors hover:bg-gray-100">
                  {/* hardcoded gray colors */}
                  <span className="text-sm">Log out</span>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 space-y-6 p-6">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/diverse-user-avatars.png" />
                      <AvatarFallback className="text-lg">MY</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div>
                        <h1 className="font-bold text-2xl text-gray-900">Md Kawsar islam Yeasin</h1>
                        {/* hardcoded gray-900 */}
                        <div className="mt-1 flex items-center space-x-4 text-gray-600 text-sm">
                          {/* hardcoded gray-600 */}
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>mdkawsarislam2002@gmail.com</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>Dhaka, Bangladesh</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Joined March 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200" variant="secondary">
                          <Zap className="mr-1 h-3 w-3" />3 day streak (record 51)
                        </Badge>
                        <Badge className="border-purple-200 text-purple-600" variant="outline">
                          {/* hardcoded purple colors */}
                          <Trophy className="mr-1 h-3 w-3" />
                          Pro Member
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-teal-500 text-white hover:bg-teal-600">Upgrade to Pro</Button>
                  {/* hardcoded teal colors */}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Tabs className="space-y-6" defaultValue="overview">
              <TabsList className="grid w-full grid-cols-4 bg-white">
                {/* hardcoded white bg */}
                <TabsTrigger className="flex items-center space-x-2" value="overview">
                  <TrendingUp className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger className="flex items-center space-x-2" value="activity">
                  <Activity className="h-4 w-4" />
                  <span>Activity</span>
                </TabsTrigger>
                <TabsTrigger className="flex items-center space-x-2" value="achievements">
                  <Trophy className="h-4 w-4" />
                  <span>Achievements</span>
                </TabsTrigger>
                <TabsTrigger className="flex items-center space-x-2" value="settings">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent className="space-y-6" value="overview">
                {/* Account Activity Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-gray-900 text-xl">Account Activity</h2> {/* hardcoded gray-900 */}
                    <p className="text-gray-600 text-sm">Analytics update every three hours</p>
                    {/* hardcoded gray-600 */}
                  </div>
                  <Badge className="text-xs" variant="outline">
                    08/13/2025 to 09/11/2025
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm">% new code written by Windsurf</p>
                          {/* hardcoded gray-600 */}
                          <p className="font-bold text-3xl text-gray-900">36%</p> {/* hardcoded gray-900 */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm">Total Cascade conversations</p>
                          {/* hardcoded gray-600 */}
                          <p className="font-bold text-3xl text-gray-900">13</p> {/* hardcoded gray-900 */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm">Total Cascade messages sent</p>
                          {/* hardcoded gray-600 */}
                          <p className="font-bold text-3xl text-gray-900">16</p> {/* hardcoded gray-900 */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <p className="text-gray-600 text-sm">Total credits used</p> {/* hardcoded gray-600 */}
                          <p className="font-bold text-3xl text-gray-900">0</p> {/* hardcoded gray-900 */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-medium text-gray-600 text-sm">
                            {/* hardcoded gray-600 */}
                            Total lines of code written by Cascade
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-blue-100 text-blue-700" variant="secondary">
                              {/* hardcoded blue colors */}
                              CASCADE
                            </Badge>
                            <Badge variant="outline">TAB</Badge>
                          </div>
                        </div>
                        <p className="font-bold text-2xl text-gray-900">460</p> {/* hardcoded gray-900 */}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer height={200} width="100%">
                          <AreaChart data={codeData}>
                            <defs>
                              <linearGradient id="codeGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /> {/* hardcoded blue-500 */}
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /> {/* hardcoded blue-500 */}
                              </linearGradient>
                            </defs>
                            <XAxis axisLine={false} className="text-xs" dataKey="date" tickLine={false} />
                            <YAxis hide />
                            <Area
                              dataKey="value"
                              fill="url(#codeGradient)"
                              stroke="#3b82f6"
                              strokeWidth={2}
                              type="monotone"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="font-medium text-gray-600 text-sm">
                          {/* hardcoded gray-600 */}
                          Total Cascade messages sent
                        </CardTitle>
                        <p className="font-bold text-2xl text-gray-900">16</p> {/* hardcoded gray-900 */}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer height={200} width="100%">
                          <BarChart data={messagesData}>
                            <XAxis axisLine={false} className="text-xs" dataKey="label" tickLine={false} />
                            <YAxis hide />
                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} /> {/* hardcoded blue-500 */}
                          </BarChart>
                        </ResponsiveContainer>
                        <div className="mt-2 text-center">
                          <span className="text-gray-600 text-xs">Write mode</span> {/* hardcoded gray-600 */}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  {/* Language Distribution Pie Chart */}
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="font-medium text-gray-600 text-sm">
                          {/* hardcoded gray-600 */}
                          Language Distribution
                        </CardTitle>
                        <p className="font-bold text-gray-900 text-lg">4 Languages</p> {/* hardcoded gray-900 */}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer height={200} width="100%">
                          <PieChart>
                            <Pie
                              cx="50%"
                              cy="50%"
                              data={languageData}
                              dataKey="value"
                              innerRadius={40}
                              outerRadius={80}
                              paddingAngle={2}
                            >
                              {languageData.map((entry, index) => (
                                <Cell fill={entry.color} key={`cell-${index}`} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {languageData.map((lang, index) => (
                            <div className="flex items-center space-x-2" key={index}>
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: lang.color }} />
                              <span className="text-gray-600 text-xs">{lang.name}</span> {/* hardcoded gray-600 */}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Weekly Productivity Bar Chart */}
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="font-medium text-gray-600 text-sm">Weekly Productivity</CardTitle>
                        {/* hardcoded gray-600 */}
                        <p className="font-bold text-gray-900 text-lg">57 Total Actions</p> {/* hardcoded gray-900 */}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer height={200} width="100%">
                          <ComposedChart data={productivityData}>
                            <XAxis axisLine={false} className="text-xs" dataKey="day" tickLine={false} />
                            <YAxis hide />
                            <Bar dataKey="commits" fill="#3b82f6" radius={[2, 2, 0, 0]} /> {/* hardcoded blue-500 */}
                            <Bar dataKey="reviews" fill="#10b981" radius={[2, 2, 0, 0]} /> {/* hardcoded emerald-500 */}
                            <Line dataKey="issues" stroke="#8b5cf6" strokeWidth={2} type="monotone" />
                            {/* hardcoded violet-500 */}
                          </ComposedChart>
                        </ResponsiveContainer>
                        <div className="mt-2 flex justify-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <div className="h-3 w-3 rounded bg-blue-500" /> {/* hardcoded blue-500 */}
                            <span className="text-gray-600 text-xs">Commits</span> {/* hardcoded gray-600 */}
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="h-3 w-3 rounded bg-emerald-500" /> {/* hardcoded emerald-500 */}
                            <span className="text-gray-600 text-xs">Reviews</span> {/* hardcoded gray-600 */}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Skills Radial Chart */}
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Card className="border-0 shadow-sm">
                      <CardHeader className="pb-2">
                        <CardTitle className="font-medium text-gray-600 text-sm">Skill Levels</CardTitle>
                        {/* hardcoded gray-600 */}
                        <p className="font-bold text-gray-900 text-lg">65% Average</p> {/* hardcoded gray-900 */}
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ResponsiveContainer height={200} width="100%">
                          <RadialBarChart cx="50%" cy="50%" data={skillsData} innerRadius="20%" outerRadius="80%">
                            <RadialBar className="opacity-80" cornerRadius={10} dataKey="progress" fill="#3b82f6" />
                          </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="mt-2 space-y-1">
                          {skillsData.map((skill, index) => (
                            <div className="flex items-center justify-between" key={index}>
                              <span className="text-gray-600 text-xs">{skill.skill}</span> {/* hardcoded gray-600 */}
                              <span className="font-medium text-xs">{skill.progress}%</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="font-semibold text-gray-900 text-lg">Monthly Statistics</CardTitle>
                      {/* hardcoded gray-900 */}
                      <CardDescription>Your coding activity over the past 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer height={300} width="100%">
                        <ComposedChart data={monthlyStatsData}>
                          <XAxis dataKey="month" />
                          <YAxis yAxisId="left" />
                          <YAxis orientation="right" yAxisId="right" />
                          <Bar dataKey="lines" fill="#3b82f6" radius={[4, 4, 0, 0]} yAxisId="left" />
                          {/* hardcoded blue-500 */}
                          <Line dataKey="commits" stroke="#10b981" strokeWidth={3} type="monotone" yAxisId="right" />
                          <Line dataKey="prs" stroke="#f59e0b" strokeWidth={3} type="monotone" yAxisId="right" />
                        </ComposedChart>
                      </ResponsiveContainer>
                      <div className="mt-4 flex justify-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <div className="h-4 w-4 rounded bg-blue-500" /> {/* hardcoded blue-500 */}
                          <span className="text-gray-600 text-sm">Lines of Code</span> {/* hardcoded gray-600 */}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-4 rounded bg-emerald-500" /> {/* hardcoded emerald-500 */}
                          <span className="text-gray-600 text-sm">Commits</span> {/* hardcoded gray-600 */}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="h-2 w-4 rounded bg-amber-500" /> {/* hardcoded amber-500 */}
                          <span className="text-gray-600 text-sm">Pull Requests</span> {/* hardcoded gray-600 */}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent className="space-y-6" value="activity">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Activity Chart */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Daily Activity</CardTitle>
                      <CardDescription>Your coding activity over the past week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer height={300} width="100%">
                        <LineChart data={activityData}>
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Line dataKey="commits" name="Commits" stroke="#3b82f6" type="monotone" />
                          {/* hardcoded blue-500 */}
                          <Line dataKey="messages" name="Messages" stroke="#10b981" type="monotone" />
                          {/* hardcoded emerald-500 */}
                          <Line dataKey="lines" name="Lines of Code" stroke="#f59e0b" type="monotone" />
                          {/* hardcoded amber-500 */}
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Recent Activity */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest actions and updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <motion.div
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3"
                            initial={{ opacity: 0, x: -20 }}
                            key={index}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <div
                              className={`h-2 w-2 rounded-full ${
                                activity.type === 'commit'
                                  ? 'bg-blue-500'
                                  : activity.type === 'review'
                                    ? 'bg-emerald-500'
                                    : activity.type === 'ai'
                                      ? 'bg-red-500'
                                      : activity.type === 'achievement'
                                        ? 'bg-amber-500'
                                        : 'bg-gray-400'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm">{activity.action}</p>
                              {/* hardcoded gray-900 */}
                              <p className="text-gray-600 text-xs">{activity.time}</p> {/* hardcoded gray-600 */}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent className="space-y-6" value="achievements">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      initial={{ opacity: 0, scale: 0.95 }}
                      key={index}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="border-0 shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="text-3xl">{achievement.icon}</div>
                            <div className="flex-1 space-y-3">
                              <div>
                                <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                                {/* hardcoded gray-900 */}
                                <p className="text-gray-600 text-sm">{achievement.description}</p>
                                {/* hardcoded gray-600 */}
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-gray-600">Progress</span> {/* hardcoded gray-600 */}
                                  <span className="font-medium">{achievement.progress}%</span>
                                </div>
                                <Progress className="h-2" value={achievement.progress} />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent className="space-y-6" value="settings">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Preferences */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Settings className="h-5 w-5" />
                        <span>Preferences</span>
                      </CardTitle>
                      <CardDescription>Customize your Windsurf experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Dark Mode</p>
                          <p className="text-gray-600 text-sm">Switch to dark theme</p> {/* hardcoded gray-600 */}
                        </div>
                        <Button size="sm" variant="outline">
                          Toggle
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">AI Suggestions</p>
                          <p className="text-gray-600 text-sm">Enable AI code suggestions</p> {/* hardcoded gray-600 */}
                        </div>
                        <Button size="sm" variant="outline">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Auto-save</p>
                          <p className="text-gray-600 text-sm">Automatically save your work</p>
                          {/* hardcoded gray-600 */}
                        </div>
                        <Button size="sm" variant="outline">
                          On
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notifications */}
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Bell className="h-5 w-5" />
                        <span>Notifications</span>
                      </CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-gray-600 text-sm">Receive updates via email</p> {/* hardcoded gray-600 */}
                        </div>
                        <Button size="sm" variant="outline">
                          Enabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-gray-600 text-sm">Browser push notifications</p> {/* hardcoded gray-600 */}
                        </div>
                        <Button size="sm" variant="outline">
                          Disabled
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Weekly Summary</p>
                          <p className="text-gray-600 text-sm">Weekly activity report</p> {/* hardcoded gray-600 */}
                        </div>
                        <Button size="sm" variant="outline">
                          Enabled
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
