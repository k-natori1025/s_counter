| # | 目次 |
| ---- | ---|
| 1 | [サウナーカウンターとは](#サウナーカウンターとは) |
| 2 | [作成背景](#作成背景) |
| 3 | [インフラ構成図](#インフラ構成図) |
| 4 | [ER図](#er図) |
| 5 | [画面遷移図](#画面遷移図) |
| 6 | [使用技術](#使用技術) |
| 7 | [機能一覧](#機能一覧) |
| 8 | [工夫した点](#工夫した点) |

<br />

# :hotsprings:サウナーカウンター
![サウナーカウンターとは](/img/f36f117c03cd0682f6ac0d8d7425dfd5.png)
サウナーカウンターはサウナ施設の混雑状況を把握するアプリです。

<br />

# 作成背景
近年、空前のサウナブームと言われ、株式会社共同通信社による「日本のサウナ実態調査2023」では、サウナーと呼ばれるサウナ愛好家の人数は約1700万人にものぼります。そのため、サウナ施設に行くと、混みすぎていて入れないことがあります。私自身、地元の行きつけのサウナにいくと混雑していて入れないことが多々あります。
そこで事前にサウナの混雑状況を把握できるサービスがあれば、待ち時間を回避し、時間を有効活用できると考えました。また、サウナ施設は多くの場合、時間制でサウナを利用できるのですが、サウナ施設によっては、一人ひとりの利用時間の管理を紙への書き込みで行っているところもあります。実際、私がよく行くサウナ施設は紙で客の入退管理をしています。上記のサービスに、客の利用時間管理の機能も合わせてつけることで、利用者と施設側の双方に取って利益のあるサービスになると考え作成することにしました。

<br />

# インフラ構成図
![インフラ構成図](/img/infra.drawio.png)

<br />

# ER図
![ER図](/img/ER.drawio.png)

<br />

# 画面遷移図
![画面遷移図](/img/pages.drawio.png)

# 使用技術
| バックエンド
----|
| Ruby 3.2.2 |
| Rails 7.0.4 |
| MySQL 8.0.33|
| Nginx |
<br />

| フロントエンド
----|
| React.js 18.2.0  |
| axios |
<br />


| インフラ
----|
| docker / docker-compose  |
| GitHub Actions |
| AWS (Route53,ALB,VPC,ECR,ECS,RDS,ACM) |
<br />


# 機能一覧
### 施設側
- 店舗新規作成
- ログイン機能
- ログアウト機能
- 店舗情報編集

https://github.com/k-natori1025/s_counter/assets/130017253/05ac5e62-cfae-48c0-b295-65d08ad9b7ab

- 客の入退管理

https://github.com/k-natori1025/s_counter/assets/130017253/299c8bf3-05fe-4234-8b03-d93cacc2f545

- 投稿機能
- 画像投稿機能
- 投稿画像のプレビュー

https://github.com/k-natori1025/s_counter/assets/130017253/0631d56e-08ed-4737-b96b-8ae247888d87

### 施設利用者
- 施設情報の閲覧
- 施設検索機能
- 施設側の投稿閲覧

https://github.com/k-natori1025/s_counter/assets/130017253/c67af231-4a09-4cde-ae01-80917f6a94f1

<br />
<br />

# 工夫した点
## バックエンド
- バックエンドとフロントエンドを完全に分離し、API通信を実装

<br />

## フロントエンド
- ユーザビリティを向上させるために、React.jsの非同期通信を使用
- タブを切り替えたりしてもページの読み込みやリロードが走らないよう、完全SPAで作成
- シンプルで分かりやすいUIを採用

<br />

## インフラ
- Dockerを採用することで複数人でも同じ環境を構築
- Dockerと相性の良いAWS(ECS Fargate)を採用
- GitHub Actionsを用いてCI/CDパイプラインを構築

# 苦労した点
## React.js
- React.jsの習得に苦労した。Progateや公式チュートリアルを何周かやっても開発できるイメージがつかなかった。そこでYouTubeやUdemyでReactで簡単なアプリを作る動画を見つけ、アプリの中でuseStateやuseEffectなどがどう使われるのかを学習し、アプリを作るイメージを持つことができた。

## Docker
- Dockerを使った開発環境の構築に苦労した。Udemyで教材を見つけ、勉強し、そこで学んだことを生かして環境構築をした。Dockerとは何か、Dockerfileやcompose.ymlファイルの書き方など、Dockerについての知識を身につけることができた。

## AWS
- ECSへデプロイする際に、開発環境と本番環境の違いからDockerfileを変更する必要があったり、開発環境ではうまくいっていたAPI通信が本番環境でできなくなりその原因を探ったりするのが大変だった。自分で調べてもわからない部分は、MENTAというメンタリングサービスでDockerとAWSに詳しい方を見つけ、その方に教えていただきながら、デプロイまですることができた。

# 引き続き取り組みたい点
- 現在の混雑状況のみではなく、過去の混雑状況を表示できたり、そのデータをもとに、混雑予測ができるような機能をつけたい。そうすることで、施設側は、効率的なスタッフ配備に活かすことができ、人件費の削減にもつながると考えた。

- 現在はブラウザから直接バックエンドにリクエストを送っている状態で、セキュリティ上問題があるため、リクエストは全てフロントエンドで受けて、APIリクエストはリバースプロキシによってフロントエンドからバックエンドにリクエストが送られるように変更し、バックエンドのECSはフロントエンドのECSからのみの通信をセキュリティグループで許可することで、もっとセキュアな構成にしたい。そのためにもnginxの設定の書き方を今後学ぶ必要がある。
