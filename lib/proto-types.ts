import { docsRoute } from '@/lib/shared';
import type { Locale } from '@/lib/i18n';

/** Maps protobuf message / enum type names to doc paths (without locale prefix). */
const PROTO_TYPE_PATHS: Record<string, string> = {
  // Root & core
  ServerConfig: '/vx-core/configuration',
  ProxyInboundConfig: '/vx-core/configuration/inbounds#proxyinboundconfig',
  MultiProxyInboundConfig: '/vx-core/configuration/inbounds#multiproxyinboundconfig',
  OutboundHandlerConfig: '/vx-core/configuration/outbounds#outboundhandlerconfig',
  OutboundConfig: '/vx-core/configuration/outbounds',
  RouterConfig: '/vx-core/configuration/router#routerconfig',
  RuleConfig: '/vx-core/configuration/router#ruleconfig',
  Condition: '/vx-core/configuration/router#condition',
  SelectorConfig: '/vx-core/configuration/router#selectorconfig',
  Filter: '/vx-core/configuration/router#filter',
  SpeedTestSizeRange: '/vx-core/configuration/router#speedtestsizerange',
  Fallback: '/vx-core/configuration/router#fallback',
  Action: '/vx-core/configuration/router#action',
  DnsConfig: '/vx-core/configuration/dns#dnsconfig',
  Record: '/vx-core/configuration/dns#record',
  Resolver: '/vx-core/configuration/dns#resolver',
  ConcurrentDnsServer: '/vx-core/configuration/dns#concurrentdnsserver',
  SerialDnsServer: '/vx-core/configuration/dns#serialdnsserver',
  DnsServerConfig: '/vx-core/configuration/dns#dnsserverconfig',
  PlainDnsServer: '/vx-core/configuration/dns#plaindnsserver',
  TlsDnsServer: '/vx-core/configuration/dns#tlsdnsserver',
  DohDnsServer: '/vx-core/configuration/dns#dohdnsserver',
  QuicDnsServer: '/vx-core/configuration/dns#quicdnsserver',
  FakeDnsServer: '/vx-core/configuration/dns#fakednsserver',
  PoolConfig: '/vx-core/configuration/dns#poolconfig',
  GoDnsServer: '/vx-core/configuration/dns#godnsserver',
  EmptyDnsServer: '/vx-core/configuration/dns#emptydnsserver',
  DnsHijackConfig: '/vx-core/configuration/dns#dnshijackconfig',
  DnsRuleConfig: '/vx-core/configuration/dns#dnsruleconfig',
  DnsType: '/vx-core/configuration/dns#dnstype',
  GeoConfig: '/vx-core/configuration/geo#geoconfig',
  Domain: '/vx-core/configuration/geo#domain',
  CIDR: '/vx-core/configuration/geo#cidr',
  AtomicDomainSetConfig: '/vx-core/configuration/geo#atomicdomainsetconfig',
  AtomicIPSetConfig: '/vx-core/configuration/geo#atomicipsetconfig',
  GreatDomainSetConfig: '/vx-core/configuration/geo#greatdomainsetconfig',
  GreatIPSetConfig: '/vx-core/configuration/geo#greatipsetconfig',
  AppSetConfig: '/vx-core/configuration/geo#appsetconfig',
  AppId: '/vx-core/configuration/geo#appid',
  GeositeConfig: '/vx-core/configuration/geo#geositeconfig',
  GeoIPConfig: '/vx-core/configuration/geo#geoipconfig',
  GeoRemoteFile: '/vx-core/configuration/geo#georemotefile',
  PolicyConfig: '/vx-core/configuration/policy#policyconfig',
  UserPolicy: '/vx-core/configuration/policy#userpolicy',
  LoggerConfig: '/vx-core/configuration/log#loggerconfig',
  UserLoggerConfig: '/vx-core/configuration/log#userloggerconfig',
  UserConfig: '/vx-core/configuration/users#userconfig',
  DispatcherConfig: '/vx-core/configuration/dispatcher#dispatcherconfig',
  DialerFactoryConfig: '/vx-core/configuration/dialer-factory#dialerfactoryconfig',

  // Transport
  TransportConfig: '/vx-core/configuration/transport#transportconfig',
  SocketConfig: '/vx-core/configuration/transport/socket#socketconfig',
  TcpConfig: '/vx-core/configuration/transport/tcp#tcpconfig',
  KcpConfig: '/vx-core/configuration/transport/kcp#kcpconfig',
  WebsocketConfig: '/vx-core/configuration/transport/websocket#websocketconfig',
  HttpConfig: '/vx-core/configuration/transport/http#httpconfig',
  GrpcConfig: '/vx-core/configuration/transport/grpc#grpcconfig',
  HttpUpgradeConfig: '/vx-core/configuration/transport/httpupgrade#httpupgradeconfig',
  SplitHttpConfig: '/vx-core/configuration/transport/splithttp#splithttpconfig',
  RangeConfig: '/vx-core/configuration/transport/splithttp#rangeconfig',
  XmuxConfig: '/vx-core/configuration/transport/splithttp#xmuxconfig',
  DownConfig: '/vx-core/configuration/transport/splithttp#downconfig',
  Header: '/vx-core/configuration/transport/websocket#header',
  HttpHeader: '/vx-core/configuration/transport/http#httpheader',
  TCPFastOpenState: '/vx-core/configuration/transport/socket#tcpfastopenstate',
  TProxyMode: '/vx-core/configuration/transport/socket#tproxymode',
  ForceALPN: '/vx-core/configuration/security/tls#forcealpn',

  // Security
  TlsConfig: '/vx-core/configuration/security/tls#tlsconfig',
  Certificate: '/vx-core/configuration/security/tls#certificate',
  RealityConfig: '/vx-core/configuration/security/reality#realityconfig',

  // Inbound nested
  Security: '/vx-core/configuration/inbounds#inbound-security',
  Protocol: '/vx-core/configuration/inbounds#inbound-transport-protocol',

  // Protocols
  VmessServerConfig: '/vx-core/configuration/protocols/vmess#vmessserverconfig',
  VmessClientConfig: '/vx-core/configuration/protocols/vmess#vmessclientconfig',
  SecurityType: '/vx-core/configuration/protocols/vmess#securitytype',
  VlessServerConfig: '/vx-core/configuration/protocols/vless#vlessserverconfig',
  VlessClientConfig: '/vx-core/configuration/protocols/vless#vlessclientconfig',
  TrojanServerConfig: '/vx-core/configuration/protocols/trojan#trojanserverconfig',
  TrojanClientConfig: '/vx-core/configuration/protocols/trojan#trojanclientconfig',
  ShadowsocksServerConfig: '/vx-core/configuration/protocols/shadowsocks#shadowsocksserverconfig',
  ShadowsocksClientConfig: '/vx-core/configuration/protocols/shadowsocks#shadowsocksclientconfig',
  ShadowsocksAccount: '/vx-core/configuration/protocols/shadowsocks#shadowsocksaccount',
  Shadowsocks2022ServerConfig: '/vx-core/configuration/protocols/shadowsocks#shadowsocks2022serverconfig',
  Shadowsocks2022ClientConfig: '/vx-core/configuration/protocols/shadowsocks#shadowsocks2022clientconfig',
  ShadowsocksCipherType: '/vx-core/configuration/protocols/shadowsocks#shadowsocksciphertype',
  SocksServerConfig: '/vx-core/configuration/protocols/socks#socksserverconfig',
  SocksClientConfig: '/vx-core/configuration/protocols/socks#socksclientconfig',
  AuthType: '/vx-core/configuration/protocols/socks#authtype',
  HttpServerConfig: '/vx-core/configuration/protocols/http-proxy#httpserverconfig',
  HttpClientConfig: '/vx-core/configuration/protocols/http-proxy#httpclientconfig',
  Account: '/vx-core/configuration/protocols/http-proxy#account',
  Hysteria2ServerConfig: '/vx-core/configuration/protocols/hysteria#hysteria2serverconfig',
  Hysteria2ClientConfig: '/vx-core/configuration/protocols/hysteria#hysteria2clientconfig',
  QuicConfig: '/vx-core/configuration/protocols/hysteria#quicconfig',
  ObfsConfig: '/vx-core/configuration/protocols/hysteria#obfsconfig',
  BandwidthConfig: '/vx-core/configuration/protocols/hysteria#bandwidthconfig',
  SalamanderConfig: '/vx-core/configuration/protocols/hysteria#salamanderconfig',
  AnytlsServerConfig: '/vx-core/configuration/protocols/anytls#anytlsserverconfig',
  AnytlsClientConfig: '/vx-core/configuration/protocols/anytls#anytlsclientconfig',
  DeviceConfig: '/vx-core/configuration/protocols/wireguard#deviceconfig',
  PeerConfig: '/vx-core/configuration/protocols/wireguard#peerconfig',
  FreedomConfig: '/vx-core/configuration/protocols/builtin#freedom',
  BlackholeConfig: '/vx-core/configuration/protocols/builtin#blackhole',
  DokodemoConfig: '/vx-core/configuration/protocols/builtin#dokodemo-door',

  // Outbound helpers
  MuxConfig: '/vx-core/configuration/outbounds#outboundhandlerconfig',
  PortRange: '/vx-core/configuration/outbounds#outboundhandlerconfig',
  RandomPortSelectStrategy: '/vx-core/configuration/outbounds#outboundhandlerconfig',
  OnePortSelectStrategy: '/vx-core/configuration/outbounds#outboundhandlerconfig',
  HandlerConfig: '/vx-core/configuration/outbounds',
  ChainHandlerConfig: '/vx-core/configuration/outbounds',
};

const PRIMITIVE_TYPES = new Set([
  'string',
  'bool',
  'bytes',
  'enum',
  'Any',
  'int32',
  'int64',
  'uint32',
  'uint64',
  'float',
  'double',
  'Level',
]);

function splitTypeSuffix(type: string): { base: string; suffix: string } {
  const arrayMatch = type.match(/^(.+?)(\[\])$/);
  if (arrayMatch) {
    return { base: arrayMatch[1], suffix: arrayMatch[2] };
  }

  const mapMatch = type.match(/^(map&lt;.+&gt;)$/);
  if (mapMatch) {
    return { base: mapMatch[1], suffix: '' };
  }

  return { base: type, suffix: '' };
}

function isLinkableType(base: string): boolean {
  if (PRIMITIVE_TYPES.has(base)) {
    return false;
  }

  if (/^(string|bool|bytes|int|uint|float|double)/.test(base)) {
    return false;
  }

  return /^[A-Z]/.test(base) || base in PROTO_TYPE_PATHS;
}

export function resolveProtoTypeHref(
  type: string,
  locale: Locale,
): string | undefined {
  const { base } = splitTypeSuffix(type);
  const path = PROTO_TYPE_PATHS[base];

  if (!path || !isLinkableType(base)) {
    return undefined;
  }

  const prefix = locale === 'zh' ? '/zh' : '';
  return `${prefix}${docsRoute}${path}`;
}

export function splitProtoType(type: string) {
  return splitTypeSuffix(type);
}

export function isProtoMessageType(type: string): boolean {
  const { base } = splitTypeSuffix(type);
  return isLinkableType(base) && Boolean(PROTO_TYPE_PATHS[base]);
}
