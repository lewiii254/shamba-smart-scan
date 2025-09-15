import React, { useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users, 
  Globe, 
  HandHeart, 
  Award, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Download,
  FileText,
  Target
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Partner {
  id: string;
  name: string;
  type: 'ngo' | 'government' | 'university' | 'corporation';
  logo: string;
  description: string;
  impact: string;
  website: string;
  location: string;
  programs: string[];
}

interface DeploymentMetrics {
  totalFarmers: number;
  regionsServed: number;
  cropsAnalyzed: number;
  yieldImprovement: number;
}

const Partnerships = () => {
  const [contactForm, setContactForm] = useState({
    organization: '',
    email: '',
    phone: '',
    type: '',
    message: ''
  });
  
  const [metrics] = useState<DeploymentMetrics>({
    totalFarmers: 15420,
    regionsServed: 23,
    cropsAnalyzed: 89340,
    yieldImprovement: 34.2
  });

  const { t } = useLanguage();
  const { toast } = useToast();

  const partners: Partner[] = [
    {
      id: 'fao',
      name: 'Food and Agriculture Organization (FAO)',
      type: 'ngo',
      logo: '🌾',
      description: 'Leading efforts to defeat hunger and improve nutrition and food security',
      impact: '500,000+ smallholder farmers reached',
      website: 'https://www.fao.org',
      location: 'Global',
      programs: ['Digital Agriculture Initiative', 'Smallholder Support Program', 'Climate-Smart Agriculture']
    },
    {
      id: 'usaid',
      name: 'USAID Feed the Future',
      type: 'government',
      logo: '🇺🇸',
      description: 'US Government initiative to address global hunger and food security',
      impact: '12 countries, 2M+ farmers benefited',
      website: 'https://www.feedthefuture.gov',
      location: 'United States',
      programs: ['Innovation Labs', 'Digital Agriculture', 'Value Chain Development']
    },
    {
      id: 'cimmyt',
      name: 'International Maize and Wheat Improvement Center',
      type: 'ngo',
      logo: '🌽',
      description: 'Research and development for sustainable maize and wheat systems',
      impact: '300+ varieties developed, 150M farmers served',
      website: 'https://www.cimmyt.org',
      location: 'Mexico (Global reach)',
      programs: ['Breeding Programs', 'Digital Agriculture', 'Climate Adaptation']
    },
    {
      id: 'cgiar',
      name: 'CGIAR',
      type: 'ngo',
      logo: '🔬',
      description: 'Global research partnership for a food-secure future',
      impact: 'Research benefiting 3 billion people',
      website: 'https://www.cgiar.org',
      location: 'Global',
      programs: ['Climate Change Initiative', 'Digital Innovation', 'Gender Equality']
    },
    {
      id: 'acdi-voca',
      name: 'ACDI/VOCA',
      type: 'ngo',
      logo: '🤝',
      description: 'Economic opportunities for farmers and rural communities',
      impact: '9M+ people reached in 145+ countries',
      website: 'https://www.acdivoca.org',
      location: 'Global',
      programs: ['Digital Agriculture', 'Market Linkages', 'Youth in Agriculture']
    },
    {
      id: 'ministry-kenya',
      name: 'Ministry of Agriculture - Kenya',
      type: 'government',
      logo: '🇰🇪',
      description: 'Government body overseeing agricultural development in Kenya',
      impact: '4M+ farmers in national programs',
      website: 'https://kilimo.go.ke',
      location: 'Kenya',
      programs: ['Digital Extension Services', 'Crop Insurance', 'Market Information Systems']
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: 'Partnership Inquiry Sent',
      description: 'We will review your proposal and get back to you within 48 hours.',
    });
    
    setContactForm({
      organization: '',
      email: '',
      phone: '',
      type: '',
      message: ''
    });
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'ngo': return 'bg-green-500';
      case 'government': return 'bg-blue-500';
      case 'university': return 'bg-purple-500';
      case 'corporation': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'ngo': return 'NGO';
      case 'government': return 'Government';
      case 'university': return 'University';
      case 'corporation': return 'Corporation';
      default: return 'Partner';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤝 Global Partnerships
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with leading organizations to scale AI-powered agricultural solutions worldwide
          </p>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="text-center py-6">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {metrics.totalFarmers.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Farmers Reached</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="text-center py-6">
              <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{metrics.regionsServed}</div>
              <div className="text-sm text-gray-600">Regions Served</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="text-center py-6">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {metrics.cropsAnalyzed.toLocaleString()}+
              </div>
              <div className="text-sm text-gray-600">Crops Analyzed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="text-center py-6">
              <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">+{metrics.yieldImprovement}%</div>
              <div className="text-sm text-gray-600">Yield Improvement</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="partners" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="partners" className="gap-2">
              <Building2 className="h-4 w-4" />
              Partners
            </TabsTrigger>
            <TabsTrigger value="programs" className="gap-2">
              <Target className="h-4 w-4" />
              Programs
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <FileText className="h-4 w-4" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="h-4 w-4" />
              Partner with Us
            </TabsTrigger>
          </TabsList>

          <TabsContent value="partners" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{partner.logo}</div>
                        <div>
                          <div className="text-lg">{partner.name}</div>
                          <Badge className={getPartnerTypeColor(partner.type)}>
                            {getPartnerTypeLabel(partner.type)}
                          </Badge>
                        </div>
                      </div>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {partner.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{partner.description}</p>
                    
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-blue-800">Impact</div>
                      <div className="text-sm text-blue-600">{partner.impact}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Programs:</div>
                      <div className="flex flex-wrap gap-1">
                        {partner.programs.map((program, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                      onClick={() => window.open(partner.website, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Smallholder Farmer Program
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Free access to AI diagnosis tools for farmers with less than 5 acres
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Free disease diagnosis</li>
                    <li>• SMS-based results delivery</li>
                    <li>• Local language support</li>
                    <li>• Extension officer integration</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-green-600" />
                    Government Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    National agricultural systems integration for policy makers
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Real-time disease monitoring</li>
                    <li>• Early warning systems</li>
                    <li>• Policy recommendation dashboards</li>
                    <li>• Resource allocation optimization</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-purple-600" />
                    Research Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Joint research programs with universities and research institutions
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Data sharing partnerships</li>
                    <li>• Model improvement collaboration</li>
                    <li>• Field trial coordination</li>
                    <li>• Publication partnerships</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HandHeart className="h-5 w-5 text-orange-600" />
                    Humanitarian Response
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Emergency agricultural support for crisis-affected regions
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Rapid deployment protocols</li>
                    <li>• Offline-capable solutions</li>
                    <li>• Multi-language support</li>
                    <li>• Coordination with aid organizations</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Partnership Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Comprehensive guide for potential partners on collaboration models
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Technical Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    API documentation and integration requirements
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Impact Report 2024</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Annual report showcasing partnership outcomes and impact
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Training Materials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Educational resources for partner organizations and staff
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download ZIP
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Data Sharing Agreement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Legal framework for data collaboration and privacy protection
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Success Stories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Case studies from successful partnership implementations
                  </p>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Inquiry</CardTitle>
                  <CardDescription>
                    Tell us about your organization and how we can collaborate
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Name</label>
                      <Input
                        value={contactForm.organization}
                        onChange={(e) => setContactForm(prev => ({ ...prev, organization: e.target.value }))}
                        placeholder="Your organization name"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="contact@organization.org"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone</label>
                        <Input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Organization Type</label>
                      <select
                        value={contactForm.type}
                        onChange={(e) => setContactForm(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select organization type</option>
                        <option value="ngo">Non-Governmental Organization</option>
                        <option value="government">Government Agency</option>
                        <option value="university">University/Research Institution</option>
                        <option value="corporation">Corporation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Partnership Proposal</label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Describe your partnership proposal, target regions, expected impact, and collaboration goals..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Submit Partnership Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Partnership Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Users className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Field Implementation</h4>
                          <p className="text-sm text-gray-600">
                            Deploy AI Crop Doctor in your agricultural programs
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Globe className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Data Collaboration</h4>
                          <p className="text-sm text-gray-600">
                            Share agricultural data to improve AI models
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Building2 className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Research Partnership</h4>
                          <p className="text-sm text-gray-600">
                            Joint research on agricultural AI applications
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="bg-orange-100 p-2 rounded-lg">
                          <HandHeart className="h-4 w-4 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Funding & Grants</h4>
                          <p className="text-sm text-gray-600">
                            Co-apply for research and development funding
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">partnerships@aicropdoctor.org</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">+1 (555) 123-CROP</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">Global Operations Center</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Partnerships;