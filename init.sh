alias cluster1="ssh admin@192.168.0.101"
alias cluster3="ssh admin@192.168.0.103"
alias k=kubectl
git clone https://github.com/karelverhelst/ntug
cd ~/ntug
sudo apt install -y nfs-common
k create ns ntug
k apply -f pvc-web.yaml -n ntug
k appy -f pvc-mariadb.yaml -n ntug
