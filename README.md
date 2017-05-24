# リモートログtailサンプル

fluentdを使って複数のサーバからログを収集。nodejs + socket.ioを使ってブラウザ上から `tail -F` のように閲覧できるサンプルコード。Vagrant環境のItamaeやChef構築コードはないので書きを参考に適当に作ってください。

## 環境構築

### td-agentのインストール

```
sudo yum update -y
curl -L https://toolbelt.treasuredata.com/sh/install-redhat-td-agent2.sh | sh

sudo systemctl enable td-agent.service
sudo service td-agent start

sudo systemctl stop firewalld
sudo systemctl disable firewalld.service
sudo td-agent-gem install fluent-plugin-forest
```

### nodejsのビューワー構築

```
sudo yum install epel-release
sudo yum install nodejs
```

```
cd aggregator/tail-cli
npm install
node index.js
```
